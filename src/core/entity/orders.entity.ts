import { Delivery } from "src/api/deliveries/entities/delivery.entity";
import { OrderItem } from "src/api/order-items/entities/order-item.entity";
import { Payment } from "src/api/payments/entities/payment.entity";
import { User } from "src/api/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity('orders')
export class orders{
@PrimaryGeneratedColumn()
id:number

@Column({type:'int'})
reservation_id:number

@Column({type:'varchar'})
status:string

@CreateDateColumn()
created_at: Date;

@Column({type:'int'})
manager_id:number



// @ManyToOne(() => Reservation, r => r.orders, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'reservation_id' })
// reservation: Reservation;

// @ManyToOne(() => User, u => u.managed_orders, { onDelete: 'SET NULL' })
// @JoinColumn({ name: 'manager_id' })
// manager: User;

// @OneToMany(() => OrderItem, oi => oi.order)
// order_items: OrderItem[];

// @OneToOne(() => Payment, p => p.order)
// payment: Payment;

// @OneToOne(() => Delivery, d => d.order)
// delivery: Delivery;

}