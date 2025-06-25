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
import { MenuIngredient } from 'src/api/menu-ingredients/entities/menu-ingredient.entity';
import { OrderItem } from './order-item.entity';
import { Review } from 'src/api/reviews/entities/review.entity';

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

  // @OneToMany(() => MenuIngredient, (menuIngredient) => menuIngredient.menuItem)
  // ingredients: MenuIngredient[];

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.menuItem)
  // orderItems: OrderItem[];

  // @OneToMany(() => Review, (review) => review.menuItem)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
