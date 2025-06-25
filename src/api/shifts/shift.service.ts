
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftEntity } from '../../core/entity/shifts.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { UserEntity } from '../../core/entity/user.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(ShiftEntity)
    private readonly shiftRepo: Repository<ShiftEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateShiftDto): Promise<ShiftEntity> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const shift = this.shiftRepo.create({
      user,
      start_time: new Date(dto.start_time),
      end_time: new Date(dto.end_time),
    });

    return this.shiftRepo.save(shift);
  }

  findAll(): Promise<ShiftEntity[]> {
    return this.shiftRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<ShiftEntity> {
    const shift = await this.shiftRepo.find({
      where: { id: id.toString() },
      relations: ['user'],
    }).then(arr => arr[0]);

    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async update(id: number, dto: UpdateShiftDto): Promise<ShiftEntity> {
    const shift = await this.findOne(id);
    if (dto.start_time) shift.start_time = new Date(dto.start_time);
    if (dto.end_time) shift.end_time = new Date(dto.end_time);
    return this.shiftRepo.save(shift);
  }

  async remove(id: number): Promise<void> {
    const shift = await this.findOne(id);
    await this.shiftRepo.remove(shift);
  }
}
