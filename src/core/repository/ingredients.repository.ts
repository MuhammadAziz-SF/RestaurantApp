import { Repository } from "typeorm";
import { ingredients } from "../entity";

export type IngredientRepository=Repository<ingredients>