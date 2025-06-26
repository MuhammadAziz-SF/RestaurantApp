import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { menu_items } from './menu_items.entity';
import { ingredients } from './ingredients.entity';

@Entity('menu_ingredients')
export class menuIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  menu_item_id: number;

  @Column({ type: 'int' })
  ingredient_id: number;

  @Column({ type: 'decimal' })
  quantity: number;

  @ManyToOne(() => menu_items, mi => mi.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_item_id' , referencedColumnName: 'id'})
  menu_item: menu_items;

  @ManyToOne(() => ingredients, i => i.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' , referencedColumnName: 'id'})
  ingredient: ingredients;
}
