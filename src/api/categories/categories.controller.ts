import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categories } from '../../core/entity/categories.entity';

@ApiTags('Category API')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @ApiOperation({
    summary: 'Create category'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Phone'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {},
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed creating category',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on creating category',
      },
    }
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // ==============================================================

  @ApiOperation({
    summary: 'Get all category'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all categories',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [Categories],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed get categories',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating categories',
      },
    },
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // ==============================================================

  @ApiOperation({
    summary: 'Get one category by ID'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get category by ID',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [Categories]
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed get category by ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on get category by ID',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  // ==============================================================

  @ApiOperation({
    summary: 'Update category'
  })
  @ApiParam({
    name: 'id',
    description: 'ID category',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'id'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update category by ID',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: '2, 3, 4',
          name: 'Ben Forbs'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed update category',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating category',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  // ==============================================================


  @ApiOperation({
    summary: 'Delete category by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the category',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category by ID deleted successfully',
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
    description: 'Failed delete category by ID',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on deleting category by ID',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
