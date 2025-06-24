import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unique: true })
  table_number: number;

  @Column({ type: 'int' })
  @Min(1)
  @Max(2)
  capacity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Max(2)
  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
