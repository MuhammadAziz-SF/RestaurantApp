import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { menu_items } from "./menu_items.entity";
import { User } from "src/api/users/entities/user.entity";

@Entity('reviews')
export class reviews{
@PrimaryGeneratedColumn()
id:number

@Column({type:'int'})
user_id:number

@Column({type:'int'})
menu_item_id:number

@Column({type:'int'})
rating:number

@Column({type:'varchar'})
comment:string;

@CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @ManyToOne(() => User, u => u.reviews, { onDelete: 'SET NULL' })
// @JoinColumn({ name: 'user_id' })
// user: User;

// @ManyToOne(() => menu_items, m => m.reviews, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'menu_item_id' })
// menu_item: menu_items;

}