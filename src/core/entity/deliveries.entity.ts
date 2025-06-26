import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { orders } from './orders.entity';
import { UserEntity } from './user.entity';

@Entity('deliveries')
export class deliveries {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => orders, (order) => order.delivery)
  @JoinColumn({ name: 'order_id' })
  order: orders;

  @ManyToOne(() => UserEntity, (user) => user.deliveries)
  @JoinColumn({ name: 'delivery_person_id' })
  user_id: UserEntity;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'date' })
  estimated_time: Date;

  @Column({ type: 'date' })
  delivered_at: Date;
}