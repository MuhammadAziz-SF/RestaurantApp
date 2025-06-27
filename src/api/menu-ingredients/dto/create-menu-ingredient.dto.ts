import { IsNumber } from "class-validator";

export class CreateMenuIngredientDto {
    @IsNumber()
    menu_item_id: number;

    @IsNumber()
    ingredient_id: number;
    
    @IsNumber()
    quantity:number;
}
