import { Inventory } from 'src/api/inventory/entities/inventory.entity';
import { MenuIngredient } from 'src/api/menu-ingredients/entities/menu-ingredient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients')
export class ingredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  unit: string;

  //     @OneToMany(() => MenuIngredient, mi => mi.ingredient)
  // menu_ingredients: MenuIngredient[];

  // @OneToMany(() => Inventory, inv => inv.ingredient)
  // inventory: Inventory[];
}
