import { UserEntity } from "./user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("notifications")
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "varchar" })
  message: string;

  @Column({ type: "boolean" })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserEntity, (u) => u.notifications)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}
