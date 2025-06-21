import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from 'src/core/entity/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const orderItem = this.orderItemRepository.create(createOrderItemDto);
      return await this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new Error(`Buyurtma elementi yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.orderItemRepository.find({ relations: ['order'] });
    } catch (error) {
      throw new Error(
        `Buyurtma elementlarini olishda xatolik: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: { id },
        relations: ['order'],
      });
      if (!orderItem) {
        throw new NotFoundException(
          `ID si ${id} bo'lgan buyurtma elementi topilmadi`,
        );
      }
      return orderItem;
    } catch (error) {
      throw new Error(`Buyurtma elementi olishda xatolik: ${error.message}`);
    }
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const orderItem = await this.orderItemRepository.preload({
        id,
        ...updateOrderItemDto,
      });
      if (!orderItem) {
        throw new NotFoundException(
          `ID si ${id} bo'lgan buyurtma elementi topilmadi`,
        );
      }
      return await this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new Error(
        `Buyurtma elementi yangilashda xatolik: ${error.message}`,
      );
    }
  }

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
    } catch (error) {
      throw new Error(
        `Buyurtma elementi o'chirishda xatolik: ${error.message}`,
      );
    }
  }
}
