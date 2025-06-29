import { Repository } from 'typeorm';
import { orders } from '../entity/orders.entity';

export type OrdersRepository = Repository<orders>;
