import { Repository } from "typeorm";
import { invoices } from '../entity/invoices.entity'

export type InvoicesRepository = Repository<invoices>