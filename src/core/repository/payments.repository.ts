import { Repository } from 'typeorm';
import { payments } from '../entity/payments.entity';

export type PaymentsRepository = Repository<payments>;
