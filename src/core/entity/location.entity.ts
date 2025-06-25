import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { inventory } from './inventory.entity';

@Entity('location')
export class location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;

  @OneToMany(() => inventory, i => i.location)
  inventory: inventory[];
}
