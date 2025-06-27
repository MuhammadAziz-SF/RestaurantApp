import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, BadRequestException } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Ingredients API')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @ApiOperation({ summary: 'Create new ingredient' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ingredient created successfully',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {
          id: 1,
          name: 'Tomato',
          unit: 'kg',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ingredient data',
  })
  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    try {
      return await this.ingredientsService.create(createIngredientDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get all ingredients' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ingredients list fetched successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            name: 'Tomato',
            unit: 'kg',
            inventory: [
              {
                id: 1,
                quantity: 12.5,
                location: {
                  id: 2,
                  name: 'Main Warehouse',
                  type: 'Storage',
                },
              },
            ],
            menu_ingredients: [
              {
                id: 3,
                menu_item_id: 5,
                quantity: 0.5,
              },
            ],
          },
        ],
      },
    },
  })
  @Get()
  async findAll() {
    try {
      return this.ingredientsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get ingredient by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the ingredient',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ingredient fetched successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 1,
          name: 'Tomato',
          unit: 'kg',
          inventory: [
            {
              id: 1,
              quantity: 12.5,
              location: {
                id: 2,
                name: 'Main Warehouse',
                type: 'Storage',
              },
            },
          ],
          menu_ingredients: [
            {
              id: 3,
              menu_item_id: 5,
              quantity: 0.5,
            },
          ],
        },
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.ingredientsService.findOne(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Update ingredient by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the ingredient',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ingredient updated successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 1,
          name: 'Tomato',
          unit: 'kg',
        },
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    try {
      return this.ingredientsService.update(+id, updateIngredientDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete ingredient by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the ingredient',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ingredient deleted successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.ingredientsService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
