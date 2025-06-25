
import { Review } from "src/api/reviews/entities/review.entity";
import { Shift } from "src/api/shifts/entities/shift.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { Reservation } from "./reservation.entity";
import { deliveries } from "./deliveries.entity";
import { orders } from "./orders.entity";

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar'})
    fullName: string;

    @

    // @OneToMany(() => Reservation, r => r.user)
    // reservations: Reservation[];

    // @OneToMany(() => orders, order => order.manager)
    // managed_orders: orders[];

    // @OneToMany(() => deliveries, delivery => delivery.deliveryPerson)
    // deliveries: deliveries[];

    // @OneToMany(() => Shift, shift => shift.user)
    // shifts: Shift[];

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

}
