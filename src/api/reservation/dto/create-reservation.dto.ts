import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { ReservationStatus } from "../../../common/enum/base.enum";

export class CreateReservationDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  table_id: string;

  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;

  @IsDateString()
  @IsOptional()
  reservation_time?: string;
}
