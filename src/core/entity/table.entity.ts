import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  table_number: number;

  @Column({ type: 'int' })
  capacity: number;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}