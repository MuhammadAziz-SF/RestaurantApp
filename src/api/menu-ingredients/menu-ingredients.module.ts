import { Module } from "@nestjs/common";
import { MenuIngredientsService } from "./menu-ingredients.service";
import { MenuIngredientsController } from "./menu-ingredients.controller";

@Module({
  controllers: [MenuIngredientsController],
  providers: [MenuIngredientsService],
})
export class MenuIngredientsModule {}
