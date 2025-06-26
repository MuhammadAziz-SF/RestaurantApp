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
import { UserEntity } from './user.entity';

@Entity('reviews')
export class reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'int' })
  menu_item_id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (u) => u.reviews, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => menu_items, (m) => m.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_item_id' })
  menu_item: menu_items;
<<<<<<< HEAD
}
=======
}
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
