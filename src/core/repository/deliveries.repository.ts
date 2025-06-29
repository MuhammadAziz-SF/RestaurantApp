import { Repository } from 'typeorm';
import { deliveries } from '../entity/deliveries.entity';

export type DeliveriesRepository = Repository<deliveries>;
