import { isString, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
}
