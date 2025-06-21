import { IsUUID, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../../common/enum/base.enum';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsOptional()
  reservation_id?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsUUID()
  @IsOptional()
  manager_id?: string;
}
