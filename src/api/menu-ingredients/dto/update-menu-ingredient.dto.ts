import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuIngredientDto } from './create-menu-ingredient.dto';

export class UpdateMenuIngredientDto extends PartialType(
  CreateMenuIngredientDto,
) {}
