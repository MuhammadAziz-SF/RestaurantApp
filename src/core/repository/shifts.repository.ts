import { Repository } from "typeorm";
import { ShiftEntity } from "../entity/shifts.entity";

export type ShiftEntityRepository = Repository<ShiftEntity>