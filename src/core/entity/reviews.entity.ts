import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { menu_items } from './menu_items.entity';

@Entity('reviews')
export class reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'varchar' })
  menu_item_id: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => User, u => u.reviews, { onDelete: 'SET NULL' })
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  // @ManyToOne(() => menu_items, m => m.reviews, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'menu_item_id' })
  // menu_item: menu_items;
}
