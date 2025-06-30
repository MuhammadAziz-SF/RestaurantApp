import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/core/entity/categories.entity";
import { DeepPartial, Repository } from "typeorm";
import { CategoryRepository } from "src/core/repository";
import { BaseService } from "src/infrastructure/lib/baseService";

@Injectable()
export class CategoryService extends BaseService<
  CreateCategoryDto,
  DeepPartial<Categories>
> {
  constructor(@InjectRepository(Categories) categoryRepo: CategoryRepository) {
    super(categoryRepo);
  }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const existsName = await this.repository.findOne({
        where: { name: createCategoryDto.name },
      });
      if (existsName) {
        throw new ConflictException("Name already exists");
      }
      const category = this.repository.create(createCategoryDto);
      await this.repository.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllHuyna() {
    try {
      const categories = await this.getRepository.find({
        select: ["id", "name"],
        order: { created_at: "DESC" },
      });
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.getRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException("Not Found");
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.getRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException("Not Found");
      }

      await this.getRepository.update(id, updateCategoryDto);
      const updatecategory = await this.getRepository.findOne({
        where: { id },
        select: ["id", "name"],
      });
      return updatecategory;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.getRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException("Not Found");
      }
      await this.getRepository.delete(id);
      return { message: "success" };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
