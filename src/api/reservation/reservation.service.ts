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
<<<<<<< HEAD
  ) { }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    try {
      const reservation = this.reservationRepository.create({
        user: { id: dto.user_id },
        table: { id: dto.table_id },
        status: dto.status ?? ReservationStatus.PENDING,
        reservation_time: dto.reservation_time,
=======
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation = this.reservationRepository.create({
        user: { id: createReservationDto.user_id },
        table: { id: createReservationDto.table_id },
        status: createReservationDto.status ?? ReservationStatus.PENDING,
        reservation_time: createReservationDto.reservation_time,
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
      });

      return await this.reservationRepository.save(reservation);
    } catch (error) {
<<<<<<< HEAD
      throw new BadRequestException('Failed to create reservation');
=======
      throw new BadRequestException(
        `Failed to create reservation: ${error.message}`,
      );
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
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
<<<<<<< HEAD
        relations: ['table', 'user'],
=======
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
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

  async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {

    try {
      const reservation = await this.findOne(id);

      if (dto.user_id !== undefined) {
        reservation.user = { id: dto.user_id };
      }

      
      if (dto.status !== undefined) {
        if (!Object.values(ReservationStatus).includes(dto.status)) {
          throw new BadRequestException('Invalid status value');
        }
        reservation.status = dto.status;
      }
<<<<<<< HEAD

=======
      if (
        dto.status &&
        !Object.values(ReservationStatus).includes(dto.status)
      ) {
        throw new BadRequestException(
          'Invalid status. Use a correct enum value.',
        );
      }
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7

      if (dto.reservation_time !== undefined) {
        reservation.reservation_time = new Date(dto.reservation_time);
      }

      return await this.reservationRepository.save(reservation);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
<<<<<<< HEAD
      throw new InternalServerErrorException('Failed to update reservation');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
=======
      throw new BadRequestException(
        'Failed to update reservation. correct COLUMN',
      );
    }
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new BadRequestException('Reservation ID is required');

>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
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
