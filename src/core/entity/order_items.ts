import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { menu_items } from "./menu_items.entity";
import { Order } from "src/api/orders/entities/order.entity";

@Entity('order_items')

export class order_items{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'uuid'})
    order_id:string;

    @Column({type:'int'})
    menu_items_id:number;

    @Column({type:'int'})
    quantity:number

    @Column({type:'decimal'})
    price:number

    // @ManyToOne(() => Order, o => o.order_items, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'order_id' })
// order: Order;

// @ManyToOne(() => menu_items, m => m.order_items, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'menu_item_id' })
// menu_item: menu_items;

}





