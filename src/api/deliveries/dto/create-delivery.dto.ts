import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { DeliveryStatus } from "src/common";

export class CreateDeliveryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @IsUUID()
  @IsNotEmpty()
  delivery_person_id: string;

  @IsNotEmpty()
  address: string;

  @IsEnum(DeliveryStatus)
  @IsNotEmpty()
  status: DeliveryStatus;

  @IsDateString()
  @IsOptional()
  estimated_time?: string;

  @IsDateString()
  @IsOptional()
  delivered_at?: string;
}
