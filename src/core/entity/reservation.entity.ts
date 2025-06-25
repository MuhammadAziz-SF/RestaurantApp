import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
<<<<<<< HEAD
=======
  OneToMany,
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
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

<<<<<<< HEAD
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

=======
  @ManyToOne(() => UserEntity, (user) => user.reservations, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => orders, (order) => order.reservation)
  orders: orders[];

  @Column({ type: 'uuid' })
  table_id: string;

  @ManyToOne(() => Table, (table) => table.reservations, { nullable: false })
  @JoinColumn({ name: 'table_id', referencedColumnName: 'id' })
  table: Table;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
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

>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
  @UpdateDateColumn()
  updated_at: Date;
}
