import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { OrderItem } from "src/core/entity/order-item.entity";
import { errorCatch } from "src/infrastructure/lib/exeption/error-catch";
import { successRes } from "src/infrastructure/lib/exeption/success-response";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  // async create(createOrderItemDto: CreateOrderItemDto) {
  //   try {
  //     const orderItem = this.orderItemRepository.create(createOrderItemDto);
  //     await this.orderItemRepository.save(orderItem);
  //     return successRes(orderItem, 201);
  //   } catch (error) {
  //     return errorCatch(error);
  //   }
  // }

  async findAll() {
    try {
      const orderItems = await this.orderItemRepository.find({
        relations: ["order"],
      });
      return successRes(orderItems);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findOne(id: string) {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: { id },
        relations: ["order"],
      });
      if (!orderItem) {
        throw new NotFoundException(
          `ID si ${id} bo'lgan buyurtma elementi topilmadi`,
        );
      }
      return successRes(orderItem);
    } catch (error) {
      return errorCatch(error);
    }
  }

  // async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
  //   try {
  //     const orderItem = await this.orderItemRepository.preload({
  //       id,
  //       ...updateOrderItemDto,
  //     });
  //     if (!orderItem) {
  //       throw new NotFoundException(
  //         `ID si ${id} bo'lgan buyurtma elementi topilmadi`,
  //       );
  //     }
  //     const updatedOrderItem = await this.orderItemRepository.findOne({
  //       where: { id },
  //     });
  //     return successRes(updatedOrderItem);
  //   } catch (error) {
  //     return errorCatch(error);
  //   }
  // }

  async remove(id: string) {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: { id },
      });
      if (!orderItem) {
        throw new NotFoundException(
          `ID si ${id} bo'lgan buyurtma elementi topilmadi`,
        );
      }
      await this.orderItemRepository.remove(orderItem);
      return successRes();
    } catch (error) {
      return errorCatch(error);
    }
  }
}
