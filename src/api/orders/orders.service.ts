import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from 'src/core/entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create(createOrderDto);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new Error(`Buyurtma yaratishda xatolik: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find({ relations: ['items'] });
    } catch (error) {
      throw new Error(`Buyurtmalarni olishda xatolik: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items'],
      });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      return order;
    } catch (error) {
      throw new Error(`Buyurtma olishda xatolik: ${error.message}`);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: {id}
      });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new Error(`Buyurtma yangilashda xatolik: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException(`ID si ${id} bo'lgan buyurtma topilmadi`);
      }
      await this.orderRepository.remove(order);
    } catch (error) {
      throw new Error(`Buyurtma o'chirishda xatolik: ${error.message}`);
    }
  }
}
