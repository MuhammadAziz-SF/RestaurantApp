import { Repository } from "typeorm";
import { menuIngredient } from "../entity/menu_ingredients.entity";

export type MenuIngredientsRepository = Repository<menuIngredient>;
