import { Repository } from "typeorm";
import { orders } from "../entity/orders.entity";

export type OrderRepository = Repository<orders>;
