import { Repository } from 'typeorm';
import { Table } from '../entity/table.entity';

export type TableRepository = Repository<Table>;
