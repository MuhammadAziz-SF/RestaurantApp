<<<<<<< HEAD
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;
=======
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
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7

  @Column({ type: 'int', unique: true })
  table_number: number;

  @Column({ type: 'int' })
<<<<<<< HEAD
  @Min(1)
  @Max(2)
  capacity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Max(2)
=======
  capacity: number;

>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
