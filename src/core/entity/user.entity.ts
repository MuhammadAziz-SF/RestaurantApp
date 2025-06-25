<<<<<<< HEAD
import { Entity, PrimaryColumn } from 'typeorm';
=======
>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7

import { Review } from "src/api/reviews/entities/review.entity";
import { ShiftEntity } from "src/core/entity/shifts.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Reservation } from "./reservation.entity";
import { orders } from "./orders.entity";

@Entity({ name: 'users' })
export class UserEntity {
<<<<<<< HEAD
  @PrimaryColumn('uuid')
  id: string;
=======

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar'})
    fullName: string;

    @Column({type: 'varchar'})
    email: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'enum'})
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    // @OneToMany(() => Reservation, r => r.user)
    // reservations: Reservation[];

    // @OneToMany(() => orders, order => order.manager)
    // managed_orders: orders[];

    // @OneToMany(() => deliveries, delivery => delivery.deliveryPerson)
    // deliveries: deliveries[];

    @OneToOne(() => ShiftEntity, shift => shift.user)
    shift: ShiftEntity;

    // @OneToMany(() => Review, review => review.user)
    // reviews: Review[];

// @OneToMany(() => Review, r => r.user)
// reviews: Review[];

// @OneToMany(() => Shift, s => s.user)
// shifts: Shift[];

// @OneToMany(() => Notification, n => n.user)
// notifications: Notification[];

// @OneToMany(() => Delivery, d => d.delivery_person)
// deliveries: Delivery[];

>>>>>>> edb29a4077427e1cb638b7868e73bee884ea89d7
}
