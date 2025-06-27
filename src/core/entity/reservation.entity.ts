import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ReservationStatus } from "../../common/enum/base.enum";
import { UserEntity } from "./user.entity";
import { Table } from "./table.entity";
import { orders } from "./orders.entity";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.reservations, { nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @OneToMany(() => orders, (order) => order.reservation)
  orders: orders[];

  @Column({ type: "uuid" })
  table_id: string;

  @ManyToOne(() => Table, (table) => table.reservations, { nullable: false })
  @JoinColumn({ name: "table_id", referencedColumnName: "id" })
  table: Table;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  reservation_time: Date;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
