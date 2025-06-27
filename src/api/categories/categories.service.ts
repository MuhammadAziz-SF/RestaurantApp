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
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  remove(id: string) {
    throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepo: Repository<Categories>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const existsName = await this.categoryRepo.findOne({
        where: { name: createCategoryDto.name },
      });
      if (existsName) {
        throw new ConflictException("Name already exists");
      }
      const category = this.categoryRepo.create(createCategoryDto);
      await this.categoryRepo.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepo.find({
        select: ["id", "name"],
        order: { created_at: "DESC" },
      });
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async findOne(id: string) {
  //   try {
  //     const category = await this.categoryRepo.findOne({
  //       where: { id },
  //       select: ['id', 'name'],
  //     });
  //     if (!category) {
  //       throw new NotFoundException('Not Found');
  //     }
  //     return category;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async update(id: string, updateCategoryDto: UpdateCategoryDto) {
  //   try {
  //     const category = await this.categoryRepo.findOne({ where: { id } });
  //     if (!category) {
  //       throw new NotFoundException('Not Found');
  //     }

  //     await this.categoryRepo.update(id, updateCategoryDto);
  //     const updatecategory = await this.categoryRepo.findOne({
  //       where: { id },
  //       select: ['id', 'name'],
  //     });
  //     return updatecategory;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async remove(id: string) {
  //   try {
  //     const category = await this.categoryRepo.findOne();
  //     if (!category) {
  //       throw new NotFoundException('Not Found');
  //     }
  //     await this.categoryRepo.delete(id);
  //     return { message: 'success' };
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
