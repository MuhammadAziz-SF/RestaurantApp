import {
  BadRequestException,
<<<<<<< HEAD
  ConflictException,
  Injectable,
  InternalServerErrorException,
=======
  Injectable,
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../../core/entity/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    try {
      const table = this.tableRepository.create(createTableDto);

      const existingTable = await this.tableRepository.findOne({
        where: { table_number: createTableDto.table_number },
      });
      if (existingTable) {
        throw new ConflictException(`Table with this number already exists`);
      }

      return await this.tableRepository.save(table);
    } catch (error) {
      throw new Error('Failed to create table');
    }
  }

  async findAll(): Promise<Table[]> {
    try {
      return await this.tableRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch tables');
    }
  }

  async findOne(id: string): Promise<Table> {
    try {
      const table = await this.tableRepository.findOne({ where: { id } });
      if (!table) {
        throw new NotFoundException(`Table with ID ${id} not found`);
      }
      return table;
    } catch (error) {
      throw new Error(error, error.message);
    }
  }

  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    try {
      const table = await this.tableRepository.findOneBy({ id });

      if (!table) {
        throw new NotFoundException(`Table with ID ${id} not found`);
      }

      Object.assign(table, updateTableDto);
      return await this.tableRepository.save(table);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update table with ID ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const table = await this.findOne(id);
      await this.tableRepository.remove(table);
      
    } catch (error) {
<<<<<<< HEAD
=======
      if (error instanceof NotFoundException) {
        throw error;
      }
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
      throw new BadRequestException(
        'Failed to delete table. This table use in Reservations.',
      );
    }
  }
}
