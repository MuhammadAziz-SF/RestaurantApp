import { Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';

export type ReservationRepository = Repository<Reservation>;
