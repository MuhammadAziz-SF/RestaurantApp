import { inventory } from './inventory.entity';
import { menuIngredient } from './menu_ingredients.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
