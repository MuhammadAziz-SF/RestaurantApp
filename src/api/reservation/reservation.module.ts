import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservation.controller';
import { Reservation } from '../../core/entity/reservation.entity';
import { TablesModule } from '../tables/tables.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), TablesModule, UsersModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationModule {}
