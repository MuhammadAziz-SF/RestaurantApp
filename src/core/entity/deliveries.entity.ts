import { Order } from "src/api/orders/entities/order.entity";
import { User } from "src/api/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { orders } from "./orders.entity";

@Entity('deliveries')
export class deliveries{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    order_id:number

    @Column({type:'int'})
    delivery_person_id:number;

    @Column({type:'varchar'})
    address:string

    @Column({type:'varchar'})
    status:string

    @Column({type:'date'})
    estimated_time:Date;

    @Column({type:'date'})
    delivered_at:Date



    // @OneToOne(() => Order, orders => orders.deliveries, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'order_id' })
    // order: Order;

    // @ManyToOne(() => User, u => u.deliveries, { onDelete: 'SET NULL' })
    // @JoinColumn({ name: 'delivery_person_id' })
    // delivery_person: User;

}
