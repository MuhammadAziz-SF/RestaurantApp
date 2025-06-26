import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
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

<<<<<<< HEAD
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
=======
  // async create(createTableDto: CreateTableDto): Promise<Table> {
  //   try {
  //     const table = this.tableRepository.create(createTableDto);
  //     return await this.tableRepository.save(table);
  //   } catch (error) {
  //     throw new Error('Failed to create table');
  //   }
  // }
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe

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

<<<<<<< HEAD
  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    try {
      const table = await this.tableRepository.findOneBy({ id });

      if (!table) {
        throw new NotFoundException(`Table with ID ${id} not found`);
      }

      Object.assign(table, updateTableDto);
      return await this.tableRepository.save(table);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update table with ID ${id}`,
      );
    }
  }
=======
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
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe

  async remove(id: string): Promise<void> {
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
