import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Deliveries } from "src/core";
import { Repository } from "typeorm";
import { DeliveryStatus } from "src/common";
import { successRes } from "src/infrastructure/lib/exeption/success-response";
import { errorCatch } from "src/infrastructure/lib/exeption/error-catch";

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Deliveries)
    private deliveryRepository: Repository<Deliveries>
  ) {}
  async create(createDeliveryDto: CreateDeliveryDto): Promise<any> {
    try {
      if (!createDeliveryDto.status) {
        createDeliveryDto.status = DeliveryStatus.ASSIGNED;
      }
      if (
        !createDeliveryDto.estimated_time ||
        isNaN(Date.parse(createDeliveryDto.estimated_time))
      ) {
        throw new BadRequestException(
          "Estimated time talab qilinadi va to'g'ri formatda bo'lishi kerak"
        );
      }
      if (new Date(createDeliveryDto.estimated_time) < new Date()) {
        throw new BadRequestException(
          "Estimated time o'tgan vaqt bo'lishi mumkin emas"
        );
      }
      const delivery = this.deliveryRepository.create(createDeliveryDto);
      const savedDelivery = await this.deliveryRepository.save(delivery);
      return successRes(savedDelivery, 201);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const deliveries = await this.deliveryRepository.find({
        order: { estimated_time: "ASC" },
      });
      return successRes(deliveries, 200);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const delivery = await this.deliveryRepository.findOneBy({ id });
      if (!delivery) {
        throw new NotFoundException(
          `ID si ${id} bo'lgan yetkazib berish topilmadi`
        );
      }
      return successRes(delivery, 200);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<any> {
    try {
      const delivery = await this.findOne(id);
      if (
        updateDeliveryDto.estimated_time &&
        new Date(updateDeliveryDto.estimated_time) < new Date()
      ) {
        throw new BadRequestException(
          "Estimated time o'tgan vaqt bo'lishi mumkin emas"
        );
      }
      await this.deliveryRepository.update(id, updateDeliveryDto);
      return successRes(await this.findOne(id), 200);
    } catch (error) {
      return errorCatch(errorCatch);
    }
  }

  async remove(id: string): Promise<any> {
    const delivery = await this.findOne(id);
    if (delivery.status === DeliveryStatus.DELIVERED) {
      throw new BadRequestException(
        "Yetkazib berilgan buyumni o'chirib bo'lmaydi"
      );
    }
    await this.deliveryRepository.delete(id);
    return successRes(null, 200, "Yetkazib berish muvaffaqiyatli o'chirildi");
  }

  async updateStatus(id: string, status: DeliveryStatus): Promise<any> {
    const delivery = await this.findOne(id);
    if (
      delivery.status === DeliveryStatus.DELIVERED &&
      status !== DeliveryStatus.DELIVERED
    ) {
      throw new BadRequestException(
        "Yetkazib berilgan buyumning holatini o'zgartirib bo'lmaydi"
      );
    }
    if (status === DeliveryStatus.DELIVERED && !delivery.delivered_at) {
      delivery.delivered_at = new Date().toISOString();
    }
    await this.deliveryRepository.update(id, {
      status,
      delivered_at: delivery.delivered_at,
    });
    return successRes(await this.findOne(id), 200);
  }
}
