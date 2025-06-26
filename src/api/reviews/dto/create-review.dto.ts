import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class CreateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @IsNotEmpty()
  menu_item_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsOptional()
  id?: string; 
}