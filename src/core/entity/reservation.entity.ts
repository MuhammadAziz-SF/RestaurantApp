import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ReservationStatus } from '../../common/enum/base.enum';
import { UserEntity } from './user.entity';
import { Table } from './table.entity';
import { orders } from './orders.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;


  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'int' })
  table_id: number;

  @ManyToOne(() => Table, (table) => table.reservations)
  @JoinColumn({ name: 'id' })
  table: Table;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  reservation_time: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => orders, (order) => order.reservation)
  orders: orders[];

  @UpdateDateColumn()
  updated_at: Date;
}
