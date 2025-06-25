import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;
}
