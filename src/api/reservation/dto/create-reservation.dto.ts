import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ReservationStatus } from '../../../common/enum/base.enum';

export class CreateReservationDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
<<<<<<< HEAD
  table_id: string;
=======
  table_id: number;
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7

  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;

  @IsDateString()
  @IsOptional()
  reservation_time?: string;
}
