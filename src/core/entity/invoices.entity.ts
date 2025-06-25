import { Payment } from 'src/api/payments/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invoices')
export class invoices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  payment_id: number;

  @Column({ type: 'date' })
  issued_at: Date;

  // @OneToOne(() => Payment, p => p.invoice, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'payment_id' })
  // payment: Payment;
}
