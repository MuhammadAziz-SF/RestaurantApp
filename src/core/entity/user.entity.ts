import { Entity, PrimaryColumn } from 'typeorm';

/*---------------------BETA-USER ENTITY---------------------*/
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;
}
