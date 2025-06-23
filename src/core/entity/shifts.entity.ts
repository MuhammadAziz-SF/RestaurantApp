import { User } from "src/api/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('shifts')
export class shifts{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    user_id:number

    @Column({type:'date'})
    start_time:Date

    @Column({type:'date'})
    end_time:Date

    // @ManyToOne(() => User, u => u.shifts, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'user_id' })
    // user: User;

}