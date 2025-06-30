import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { orders } from "src/core/entity/orders.entity";
import { OrderItem } from "src/core/entity/order-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([orders, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
