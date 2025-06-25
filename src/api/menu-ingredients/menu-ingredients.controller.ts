import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuIngredientsService } from './menu-ingredients.service';
import { CreateMenuIngredientDto } from './dto/create-menu-ingredient.dto';
import { UpdateMenuIngredientDto } from './dto/update-menu-ingredient.dto';

@Controller('menu-ingredients')
export class MenuIngredientsController {
  constructor(private readonly menuIngredientsService: MenuIngredientsService) {}

  @Post()
  create(@Body() createMenuIngredientDto: CreateMenuIngredientDto) {
    return this.menuIngredientsService.create(createMenuIngredientDto);
  }

  @Get()
  findAll() {
    return this.menuIngredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuIngredientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuIngredientDto: UpdateMenuIngredientDto) {
    return this.menuIngredientsService.update(+id, updateMenuIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuIngredientsService.remove(+id);
  }
}
