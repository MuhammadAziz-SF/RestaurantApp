import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../core/entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { TablesService } from '../tables/tables.service';
import { ReservationStatus } from '../../common/enum/base.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly tablesService: TablesService,
  ) { }
  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    try {
      const reservation = this.reservationRepository.create({
        user: { id: createReservationDto.user_id } as any,
        table: { id: createReservationDto.table_id } as any,
        status: createReservationDto.status ?? ReservationStatus.PENDING,
        reservation_time: createReservationDto.reservation_time,
      });

      return await this.reservationRepository.save(reservation);
    } catch (error) {
      throw new BadRequestException(`Failed to create reservation: ${error.message}`);
    }
  }


  async findAll(): Promise<Reservation[]> {
    try {
      return await this.reservationRepository.find({
        relations: ['table', 'user'], // добавлена user связь
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch reservations');
    }
  }

  async findOne(id: string): Promise<Reservation> {
    if (!id) throw new BadRequestException('Reservation ID is required');

    try {
      const reservation = await this.reservationRepository.findOne({
        where: { id },
        relations: ['table', 'user'], // добавлена user связь
      });

      if (!reservation) {
        throw new NotFoundException(`Reservation with ID ${id} not found`);
      }

      return reservation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to fetch reservation');
    }
  }

  async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
    if (!id) throw new BadRequestException('Reservation ID is required');

    try {
      const reservation = await this.findOne(id);

      // Обновляем связанные сущности при необходимости
      if (dto.table_id !== undefined) {
        reservation.table = await this.tablesService.findOne(dto.table_id);
      }

      if (dto.user_id !== undefined) {
        reservation.user = { id: dto.user_id } as any;
      }

      // Обновляем простые поля
      if (dto.status !== undefined) {
        reservation.status = dto.status;
      }
      if (dto.status && !Object.values(ReservationStatus).includes(dto.status)) {
        throw new BadRequestException('Invalid status. Use a correct enum value.');
      }

      if (dto.reservation_time !== undefined) {
        reservation.reservation_time = new Date(dto.reservation_time);
      }

      return await this.reservationRepository.save(reservation);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update reservation. correct COLUMN');
    }
  }


  async remove(id: string): Promise<void> {
    if (!id) throw new BadRequestException('Reservation ID is required');

    try {
      const reservation = await this.findOne(id);
      await this.reservationRepository.remove(reservation);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete reservation');
    }
  }
}
