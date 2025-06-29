import { Repository } from 'typeorm';
import { ingredients } from '../entity/ingredients.entity';

export type IngredientsRepository = Repository<ingredients>;
