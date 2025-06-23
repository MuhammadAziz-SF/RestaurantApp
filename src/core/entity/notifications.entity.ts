import { User } from "src/api/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class notifications{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    user_id:number

    @Column({type:'varchar'})
    message:string

    @Column({type:'boolean'})
    is_read:boolean;

    @CreateDateColumn()
    created_at: Date

    // @ManyToOne(() => User, u => u.notifications, { onDelete: 'CASCADE' })

    // @JoinColumn({ name: 'user_id' })
    // user: User;

}