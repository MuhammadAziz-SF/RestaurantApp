import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuIngredientDto } from './dto/create-menu-ingredient.dto';
import { UpdateMenuIngredientDto } from './dto/update-menu-ingredient.dto';
import { menuIngredient } from 'src/core/entity';

@Injectable()
export class MenuIngredientsService {
  constructor(
    @InjectRepository(menuIngredient)
    private readonly repository: Repository<menuIngredient>,
  ) {}

  async create(dto: CreateMenuIngredientDto) {
    try {
      const exists = await this.repository.findOneBy({
        menu_item_id: dto.menu_item_id,
        ingredient_id: dto.ingredient_id,
      });

      if (exists) {
        throw new ConflictException('Already exists');
      }

      const newItem = this.repository.create(dto);
      return await this.repository.save(newItem);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.repository.find({
        select: {
          id: true,
          menu_item_id: true,
          ingredient_id: true,
          quantity: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.repository.findOne({
        where: { id },
        select: {
          id: true,
          menu_item_id: true,
          ingredient_id: true,
          quantity: true,
        },
      });

      if (!item) {
        throw new NotFoundException('Not Found')
      };
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, dto: UpdateMenuIngredientDto) {
    try {
      const exists = await this.repository.findOneBy({ id });
      if (!exists) throw new NotFoundException('Not Found');

      await this.repository.update(id, dto);

      return await this.repository.findOne({
        where: { id },
        select: {
          id: true,
          menu_item_id: true,
          ingredient_id: true,
          quantity: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.repository.findOneBy({ id });
      if (!exists) throw new NotFoundException('Not Found');

      await this.repository.delete(id);
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
