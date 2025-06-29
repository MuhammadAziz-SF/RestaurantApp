import { Repository } from 'typeorm';
import { ShiftEntity } from '../entity/shifts.entity';

export type ShiftsRepository = Repository<ShiftEntity>;