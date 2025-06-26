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
<<<<<<< HEAD
}
=======
}
>>>>>>> 117927f332bfee7c05bda7b49da2d7e516041abe
