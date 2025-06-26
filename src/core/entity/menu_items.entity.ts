import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { menuIngredient } from './menu_ingredients.entity';
import { OrderItem } from './order-item.entity';
import { reviews } from './reviews.entity';

@Entity('menu_items')
export class menu_items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ default: true })
  is_available: boolean;

  @ManyToOne(() => Categories, (category) => category.menuItems, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @OneToMany(() => menuIngredient, (menuIngredient) => menuIngredient.menu_item)
  ingredients: menuIngredient[];

<<<<<<< HEAD
  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu_item_id)
=======
  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu_item)
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
  orderItems: OrderItem[];

  @OneToMany(() => reviews, (review) => review.menu_item)
  reviews: reviews[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}