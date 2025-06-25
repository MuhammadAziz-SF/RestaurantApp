import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { menu_items } from './menu_items.entity';
import { Ingredient } from 'src/api/ingredients/entities/ingredient.entity';

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

  //     @ManyToOne(() => menu_items, mi => mi.menu_ingredients, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'menu_item_id' })
  // menu_item: menu_items;

  // @ManyToOne(() => Ingredient, i => i.menu_ingredients, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'ingredient_id' })
  // ingredient: Ingredient;
}
