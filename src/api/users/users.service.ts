
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../../core/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../../common/enum/base.enum';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { UserRepository } from 'src/core/repository';

@Injectable()
export class UsersService extends BaseService<
  CreateUserDto,
  DeepPartial<UserEntity>
>
{
  constructor(
    @InjectRepository(UserEntity)
    repository: UserRepository,
  ) {
    super(repository)
  }

  async findAllUsers(){
    return this.getRepository.find({ relations: ['shifts'] });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.getRepository.findOne({
      where: { id },
      relations: ['shifts'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto) {
    const user = this.getRepository.create(dto);
    return this.getRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.getRepository.save(user);
  }

  async updateRole(id: string, dto: UpdateUserDto) {
    await this.getRepository.update(id, { role: dto.role });
    return {message: 'User role updated successfully'};
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.getRepository.remove(user);
  }
}
