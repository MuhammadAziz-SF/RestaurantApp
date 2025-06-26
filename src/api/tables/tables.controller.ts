import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from '../tables/tables.service';
// import { CreateTableDto } from './dto/create-table.dto';
// import { UpdateTableDto } from './dto/update-table.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Table } from '../../core/entity/table.entity';

@ApiTags('Tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create table' })
  // @ApiResponse({ status: 201, description: 'Success create', type: Table })
  // @ApiBadRequestResponse({ description: 'Invalid values' })
  // create(@Body() createTableDto: CreateTableDto) {
  //   return this.tablesService.create(createTableDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, description: 'All tables', type: [Table] })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one table by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID table' })
  @ApiResponse({ status: 200, description: 'Founded', type: Table })
  @ApiNotFoundResponse({ description: 'table not found' })
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

<<<<<<< HEAD
  @Patch(':id')
  @ApiOperation({ summary: 'Update table' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID table' })
  @ApiResponse({ status: 200, description: 'Success update', type: Table })
  @ApiBadRequestResponse({ description: 'Error in update' })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }
=======
  // @Patch(':id')
  // @ApiOperation({ summary: 'Update table' })
  // @ApiParam({ name: 'id', type: 'string', description: 'ID table' })
  // @ApiResponse({ status: 200, description: 'Success update', type: Table })
  // @ApiBadRequestResponse({ description: 'Error in update' })
  // update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
  //   return this.tablesService.update(+id, updateTableDto);
  // }
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe

  @Delete(':id')
  @ApiOperation({ summary: 'Delete table' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID table' })
  @ApiResponse({ status: 200, description: 'Success delete' })
  @ApiNotFoundResponse({ description: 'table not found' })
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
