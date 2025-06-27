import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Inventory API')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Create new inventory item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Inventory item created successfully',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {
          id: 1,
          ingredient_id: 5,
          location_id: 2,
          quantity: 12.5,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to create inventory item',
    schema: {
      example: {
        status_code: 400,
        message: 'Invalid data for inventory item',
      },
    },
  })
  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      return this.inventoryService.create(createInventoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory list fetched successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            ingredient_id: 5,
            location_id: 2,
            quantity: 12.5,
            ingredient: {
              id: 5,
              name: 'Tomato',
              unit: 'kg',
            },
            location: {
              id: 2,
              name: 'Main Warehouse',
              type: 'Storage',
            },
          },
        ],
      },
    },
  })
  @Get()
  async findAll() {
    try {
      return this.inventoryService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get inventory item by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the inventory item',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory item fetched successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 1,
          ingredient_id: 5,
          location_id: 2,
          quantity: 12.5,
          ingredient: {
            id: 5,
            name: 'Tomato',
            unit: 'kg',
          },
          location: {
            id: 2,
            name: 'Main Warehouse',
            type: 'Storage',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid inventory ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Inventory item not found',
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.inventoryService.findOne(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Update inventory item by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the inventory item',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory item updated successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 1,
          ingredient_id: 5,
          location_id: 2,
          quantity: 20,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data or ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Failed to update inventory item',
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    try {
      return this.inventoryService.update(+id, updateInventoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete inventory item by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the inventory item',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory item deleted successfully',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid inventory ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Failed to delete inventory item',
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.inventoryService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
