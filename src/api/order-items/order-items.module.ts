import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/core/entity/order-item.entity';
import { orders } from 'src/core/entity/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, orders])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
