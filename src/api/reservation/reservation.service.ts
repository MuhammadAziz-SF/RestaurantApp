import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from '../../core/entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { TablesService } from '../tables/tables.service';
import { ReservationStatus } from '../../common/enum/base.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly tablesService: TablesService,

  ) { }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    try {
      const reservation = this.reservationRepository.create({
        user: { id: dto.user_id },
        table: { id: dto.table_id },
        status: dto.status ?? ReservationStatus.PENDING,
        reservation_time: dto.reservation_time,

      });

      return await this.reservationRepository.save(reservation);
    } catch (error) {

      throw new BadRequestException(
        `Failed to create reservation: ${error.message}`,
      );

    }
  }

  async findAll(): Promise<Reservation[]> {
    try {
      return await this.reservationRepository.find({
        relations: ['table', 'user'],
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch reservations');
    }
  }

  async findOne(id: string): Promise<Reservation> {

    try {
      const reservation = await this.reservationRepository.findOne({
        where: { id },

        relations: ['table', 'user'],

      });

      if (!reservation) {
        throw new NotFoundException(`Reservation with ID ${id} not found`);
      }

      return reservation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch reservation');
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    try {
      const reservation = await this.findOne(id);

      if (updateReservationDto.user_id !== undefined) {
        reservation.user.id = updateReservationDto.user_id;
      }

      if (updateReservationDto.status !== undefined) {
        if (!Object.values(ReservationStatus).includes(updateReservationDto.status)) {
          throw new BadRequestException('Invalid status value');
        }
        reservation.status = updateReservationDto.status;
      }

      if (updateReservationDto.reservation_time !== undefined) {
        reservation.reservation_time = new Date(updateReservationDto.reservation_time);
      }

      return await this.reservationRepository.save(reservation);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update reservation');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException('Reservation ID is required');
    }

    try {
      const reservation = await this.findOne(id);
      await this.reservationRepository.remove(reservation);

      return { message: 'Reservation successfully deleted' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete reservation');
    }
  }
}
