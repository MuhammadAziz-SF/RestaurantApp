import { Ingredient } from "src/api/ingredients/entities/ingredient.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('inventory')
export class inventory{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    ingredient_id:number

    @Column({type:'int'})
    location_id:number

    @Column({type:'decimal'})
    quantity:number

//     @ManyToOne(() => Ingredient, i => i.inventory, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'ingredient_id' })
// ingredient: Ingredient;

// @ManyToOne(() => Location, l => l.inventory, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'location_id' })
// location: Location;

}