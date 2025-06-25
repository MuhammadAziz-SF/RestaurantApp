import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { orders } from './orders.entity';

@Entity('payments')
export class payments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  order_id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'date' })
  paid_at: Date;

  @OneToOne(() => orders, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order: orders;
}
