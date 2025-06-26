import { reviews } from "./reviews.entity";
import { ShiftEntity } from "./shifts.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Reservation } from "./reservation.entity";
import { orders } from "./orders.entity";
import { deliveries } from "./deliveries.entity";
import { NotificationEntity } from "./notifications.entity";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reservation, r => r.user)
  reservations: Reservation[];

  @OneToMany(() => orders, order => order.manager)
  managed_orders: orders[];

  @OneToMany(() => deliveries, delivery => delivery.user_id)
  deliveries: deliveries[];

  @OneToOne(() => ShiftEntity, (shift) => shift.user)
  shift: ShiftEntity;

  @OneToMany(() => reviews, review => review.user)
  reviews: reviews[];

  @OneToMany(() => NotificationEntity, notification => notification.user)
  notifications: NotificationEntity[];
<<<<<<< HEAD
}
=======
}
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
