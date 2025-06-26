import { Repository } from "typeorm";
import { OrderItem } from "../entity/order-item.entity";

export type OrderItemRepository = Repository<OrderItem>