import { payments } from "./payments.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("invoices")
export class invoices {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  payment_id: string;

  @Column({ type: "date" })
  issued_at: Date;

  @OneToOne(() => payments, (p) => p.invoice, { onDelete: "CASCADE" })
  @JoinColumn({ name: "payment_id" })
  payment: payments;
}
