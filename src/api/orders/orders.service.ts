import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from 'src/core/entity/order.entity';
import { errorCatch } from 'src/infrastructure/lib/exeption/error-catch';
import { successRes } from 'src/infrastructure/lib/exeption/success-response';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(createOrderDto);
      const savedOrder = await this.orderRepository.save(order);
      return successRes(savedOrder,  201);
    } catch (error) {
      return errorCatch(error)
    }
  }

  async findAll() {
    try {
      const orders = await this.orderRepository.find({ relations: ['items'] });
      return successRes(orders);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items'],
      });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      return successRes(order);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      const updatedOrder = await this.orderRepository.preload({
        id, // Faqat ushbu id ishlatiladi
        ...Object.fromEntries(
          Object.entries(updateOrderDto).filter(([key]) => key !== 'id'),
        ), // id dan tashqari barcha maydonlarni olamiz
      });
      if (!updatedOrder) {
        throw new InternalServerErrorException(
          'Failed to preload order for update',
        );
      }
      const savedOrder = await this.orderRepository.save(updatedOrder);
      return successRes(savedOrder);

      const updatedOrde = await this.orderRepository.findOne({
        where: { id },
      });
      return successRes(updatedOrde);

    } catch (error) {
      return errorCatch(error);
    }
  }

  async remove(id: string){
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      await this.orderRepository.remove(order);
      return successRes();
    } catch (error) {
      return errorCatch(error);
    }
  }
}
