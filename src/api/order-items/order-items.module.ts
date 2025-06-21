import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/core/entity/order-item.entity';
import { Order } from 'src/core/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
