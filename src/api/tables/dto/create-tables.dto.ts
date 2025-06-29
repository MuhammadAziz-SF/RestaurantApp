import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;

}