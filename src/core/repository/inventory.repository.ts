import { Repository } from 'typeorm';
import { inventory } from '../entity/inventory.entity';

export type InventoryRepository = Repository<inventory>;
