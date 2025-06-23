import { Order } from "src/api/orders/entities/order.entity";
import { Review } from "src/api/reviews/entities/review.entity";
import { Shift } from "src/api/shifts/entities/shift.entity";
import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Reservation } from "./reservation.entity";
import { Delivery } from "src/api/deliveries/entities/delivery.entity";

/*---------------------BETA-USER ENTITY---------------------*/
@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryColumn('uuid')
    id: string;



// @OneToMany(() => Reservation, r => r.user)
// reservations: Reservation[];

// @OneToMany(() => Order, o => o.manager)
// managed_orders: Order[];

// @OneToMany(() => Review, r => r.user)
// reviews: Review[];

// @OneToMany(() => Shift, s => s.user)
// shifts: Shift[];

// @OneToMany(() => Notification, n => n.user)
// notifications: Notification[];

// @OneToMany(() => Delivery, d => d.delivery_person)
// deliveries: Delivery[];

}
