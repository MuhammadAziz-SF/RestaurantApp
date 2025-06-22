import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';
import { ReservationStatus } from 'src/common/enum/base.enum';


export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsOptional()
    @IsUUID()
    user_id?: string;
    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsInt()
    table_id?: number;
    @ApiPropertyOptional({ enum: ReservationStatus, example: ReservationStatus.CONFIRMED })
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;
    @IsDateString()
    @IsOptional()
    reservation_time?: string;
}