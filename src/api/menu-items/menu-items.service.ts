import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { menu_items } from 'src/core/entity/menu_items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(menu_items)
    private readonly menuRepo: Repository<menu_items>,
  ) {}
  async create(createMenuItemDto: CreateMenuItemDto) {
    try {
      const menu_items = this.menuRepo.create(createMenuItemDto);
      await this.menuRepo.save(menu_items);
      return menu_items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const menu_items = await this.menuRepo.find({
        select: ['id', 'name', 'description', 'price', 'is_available'],
        order: { created_at: 'DESC' },
      });
      return menu_items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const menu_items = await this.menuRepo.findOne({
        where: { id },
        select: ['id', 'name', 'description', 'price', 'created_at'],
      });
      if (!menu_items) {
        throw new NotFoundException('Not Found');
      }
      return menu_items;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    try {
      const menu_items = await this.menuRepo.findOne({ where: { id } });
      if (!menu_items) {
        throw new NotFoundException('Not Found');
      }
      await this.menuRepo.update({ id }, updateMenuItemDto);
      const updateMenuItem = await this.menuRepo.findOne({
        where: { id },
        select: ['id', 'name', 'description', 'price', 'is_available'],
      });
      return updateMenuItem;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const menu_items = await this.menuRepo.findOne({ where: { id } });
      if (!menu_items) {
        throw new NotFoundException('Not Found');
      }
      await this.menuRepo.delete({ id });
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
