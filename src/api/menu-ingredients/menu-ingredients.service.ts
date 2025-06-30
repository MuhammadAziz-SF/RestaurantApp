import { Injectable } from "@nestjs/common";
import { CreateMenuIngredientDto } from "./dto/create-menu-ingredient.dto";
import { UpdateMenuIngredientDto } from "./dto/update-menu-ingredient.dto";

@Injectable()
export class MenuIngredientsService {
  create(createMenuIngredientDto: CreateMenuIngredientDto) {
    return "This action adds a new menuIngredient";
  }

  findAll() {
    return `This action returns all menuIngredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuIngredient`;
  }

  update(id: number, updateMenuIngredientDto: UpdateMenuIngredientDto) {
    return `This action updates a #${id} menuIngredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuIngredient`;
  }
}
