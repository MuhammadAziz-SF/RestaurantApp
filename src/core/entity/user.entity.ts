<<<<<<< HEAD

import { reviews } from "./reviews.entity";
import { ShiftEntity } from "./shifts.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Reservation } from "./reservation.entity";
import { orders } from "./orders.entity";
import { deliveries } from "./deliveries.entity";
import { NotificationEntity } from "./notifications.entity";

@Entity({ name: 'users' })
=======
import { ShiftEntity } from "./shifts.entity";
import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Reservation } from "./reservation.entity";
import { orders } from "./orders.entity";
import {UserRole}from "../../common/enum/base.enum"
@Entity({ name: "users" })
>>>>>>> 406faa866229daec44c02f7577008e1a5129c04b
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

<<<<<<< HEAD
    @Column({type: 'varchar'})
    password: string    
=======
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
>>>>>>> 406faa866229daec44c02f7577008e1a5129c04b

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Reservation, r => r.user)
  // reservations: Reservation[];

  // @OneToMany(() => orders, order => order.manager)
  // managed_orders: orders[];

<<<<<<< HEAD
    @OneToMany(() => Reservation, r => r.user)
    reservations: Reservation[];

    @OneToMany(() => orders, order => order.manager)
    managed_orders: orders[];

    @OneToMany(() => deliveries, delivery => delivery.user_id)
    deliveries: deliveries[];
=======
  // @OneToMany(() => deliveries, delivery => delivery.deliveryPerson)
  // deliveries: deliveries[];

  @OneToOne(() => ShiftEntity, (shift) => shift.user)
  shift: ShiftEntity;

  // @OneToMany(() => Review, review => review.user)
  // reviews: Review[];
>>>>>>> 406faa866229daec44c02f7577008e1a5129c04b

  // @OneToMany(() => Review, r => r.user)
  // reviews: Review[];

<<<<<<< HEAD
    @OneToMany(() => reviews, review => review.user)
    reviews: reviews[];

    @OneToMany(() => NotificationEntity, notification => notification.user)
    notifications: NotificationEntity[];
=======
  // @OneToMany(() => Shift, s => s.user)
  // shifts: Shift[];

  // @OneToMany(() => Notification, n => n.user)
  // notifications: Notification[];

  // @OneToMany(() => Delivery, d => d.delivery_person)
  // deliveries: Delivery[];
>>>>>>> 406faa866229daec44c02f7577008e1a5129c04b
}
