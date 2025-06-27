import { inventory } from './inventory.entity';
import { menuIngredient } from './menu_ingredients.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('ingredients')
export class ingredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  unit: string;

  @OneToMany(() => menuIngredient, mi => mi.ingredient_id)
  menu_ingredients: menuIngredient[];

  @OneToMany(() => inventory, inv => inv.ingredient_id)
  inventory: inventory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
