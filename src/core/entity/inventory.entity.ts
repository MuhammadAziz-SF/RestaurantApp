import { ingredients } from './ingredients.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { location } from './location.entity';

@Entity('inventory')
export class inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  ingredient_id: number;

  @Column({ type: 'int' })
  location_id: number;

  @Column({ type: 'decimal' })
  quantity: number;

  @ManyToOne(() => ingredients, i => i.inventory, { onDelete: 'CASCADE' })
<<<<<<< HEAD
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient: ingredients;

  @ManyToOne(() => location, l => l.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: location;
}
=======
  @JoinColumn({ name: 'ingredient_id' , referencedColumnName: 'id'})
  ingredient: ingredients;

  @ManyToOne(() => location, l => l.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' , referencedColumnName: 'id'})
  location: location;
}
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
