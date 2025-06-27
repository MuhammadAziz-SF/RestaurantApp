import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ingredients } from "src/core/entity";
import { IngredientRepository } from "src/core/repository/ingredients.repository";
@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(ingredients)
    private readonly Repository: IngredientRepository,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    try {
      const existsName = await this.Repository.findOne({
        where: { name: createIngredientDto.name },
      });
      if (existsName) {
        throw new ConflictException("Name already exists");
      }
      const ingredient = this.Repository.create(createIngredientDto);
      await this.Repository.save(ingredient);
      return ingredient;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const ingredient = await this.Repository.find({
        select: ["id", "name", "unit"],
        order: { created_at: "DESC" },
      });
      return ingredient;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const ingredient = await this.Repository.findOne({
        where: { id },
        select: ["id", "name", "unit"],
      });
      if (!ingredient) {
        throw new NotFoundException("Not Found");
      }
      return ingredient;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    try {
      const ingredient = await this.Repository.findOne({ where: { id } });
      if (!ingredient) {
        throw new NotFoundException("Not Found");
      }
      await this.Repository.update({ id }, updateIngredientDto);
      const updateingredient = await this.Repository.findOne({
        where: { id },
        select: ["id", "name", "unit"],
      });
      return updateingredient;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const ingredient = await this.Repository.findOne({ where: { id } });
      if (!ingredient) {
        throw new NotFoundException("Not Found");
      }
      await this.Repository.delete({ id });
      return { message: "success" };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
