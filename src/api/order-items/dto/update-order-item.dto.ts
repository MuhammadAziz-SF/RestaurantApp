import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  quantity?: number;
  price?: number;
}
