import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../../core/entity/table.entity';
// import { CreateTableDto } from './dto/create-table.dto';
// import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  // async create(createTableDto: CreateTableDto): Promise<Table> {
  //   try {
  //     const table = this.tableRepository.create(createTableDto);
  //     return await this.tableRepository.save(table);
  //   } catch (error) {
  //     throw new Error('Failed to create table');
  //   }
  // }

  async findAll(): Promise<Table[]> {
    try {
      return await this.tableRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch tables');
    }
  }

  async findOne(id: number): Promise<Table> {
    try {
      const table = await this.tableRepository.findOne({ where: { id } });
      if (!table) {
        throw new NotFoundException(`Table with ID ${id} not found`);
      }
      return table;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to fetch table with ID ${id}`);
    }
  }

  // async update(id: number, updateTableDto: UpdateTableDto): Promise<Table> {
  //   try {
  //     const table = await this.findOne(id);
  //     Object.assign(table, updateTableDto);
  //     return await this.tableRepository.save(table);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) throw error;
  //     throw new Error(`Failed to update table with ID ${id}`);
  //   }
  // }

  async remove(id: number): Promise<void> {
    try {
      const table = await this.findOne(id);
      await this.tableRepository.remove(table);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to delete table. This table use in Reservations.',
      );
    }
  }
}
