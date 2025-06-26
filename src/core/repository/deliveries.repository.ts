import { Repository } from "typeorm";
import { deliveries } from "../entity/deliveries.entity";

export type DeliveryRepository = Repository<deliveries>