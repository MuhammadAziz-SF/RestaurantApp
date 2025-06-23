import { Invoice } from "src/api/invoices/entities/invoice.entity";
import { Order } from "src/api/orders/entities/order.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class payments{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    order_id:number

    @Column({type:'decimal'})
    amount:number

    @Column({type:'varchar'})
    status:string

    @Column({type:'date'})
    paid_at:Date


    // @OneToOne(() => Order, o => o.payment, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'order_id' })
    // order: Order;

// @OneToOne(() => Invoice, i => i.payment)
// invoice: Invoice;


}