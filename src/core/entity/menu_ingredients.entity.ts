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
import { ingredients } from './ingredients.entity';

@Entity('menu_ingredients')
export class menuIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menu_item_id: number;

  @Column()
  ingredient_id: number;

  @Column({ type: 'decimal' })
  quantity: number;

  @ManyToOne(() => menu_items, mi => mi.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_item_id' , referencedColumnName: 'id'})
  menu_item: menu_items;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ingredients, i => i.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' , referencedColumnName: 'id'})
  ingredient: ingredients;
  
}
