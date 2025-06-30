import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { deliveries } from "./deliveries.entity";
import { OrderItem } from "./order-item.entity";
import { payments } from "./payments.entity";
import { UserEntity } from "./user.entity";
import { Reservation } from "./reservation.entity";
import { OrderStatus } from "src/common";

@Entity("orders")
export class orders {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ type: "uuid" })
  reservation_id: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.managed_orders)
  @JoinColumn({ name: "manager_id" })
  manager: UserEntity;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @OneToOne(() => payments, (payment) => payment.order)
  payment: payments;

  @OneToOne(() => deliveries, (delivery) => delivery.order)
  delivery: deliveries;
}
