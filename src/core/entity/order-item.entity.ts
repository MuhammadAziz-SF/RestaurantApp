import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
<<<<<<< HEAD
import { Order } from './order.entity';
import { menu_items } from './menu_items.entity';
=======
import { menu_items } from './menu_items.entity';
import { orders } from './orders.entity';
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @ManyToOne(() => orders, (order) => order.items, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: orders;

  @Column({ type: 'uuid' })
  menu_item_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => menu_items, (menu_item) => menu_item.orderItems, { nullable: false })
  @JoinColumn({ name: 'menu_item_id' })
  menu_item: menu_items;
}
