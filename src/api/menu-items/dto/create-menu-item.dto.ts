import { IsString,IsNumber,IsBoolean,IsOptional,Min,IsInt } from "class-validator";

export class CreateMenuItemDto {
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsNumber()
    @Min(0)
    price:number;

    @IsOptional()
    @IsBoolean()
    is_available?:boolean;

    @IsInt()
    category_id?:number;
}
