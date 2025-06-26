import { Repository } from 'typeorm';
import { User } from 'src/api/users/entities/user.entity';

export type UserRepository = Repository<User>;
