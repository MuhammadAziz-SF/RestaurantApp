import { IsEmpty, IsNumber } from "class-validator";

export class CreateTableDto {
    @IsEmpty()
    @IsNumber()
    table_number: number;

    @IsEmpty()
    @IsNumber()
    capacity: number;
}
