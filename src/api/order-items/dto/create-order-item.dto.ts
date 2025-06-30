import { IsUUID, IsNotEmpty, IsInt, IsDecimal } from "class-validator";

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @IsInt()
  @IsNotEmpty()
  menu_item_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal({ decimal_digits: "2" })
  @IsNotEmpty()
  price: number;
}
