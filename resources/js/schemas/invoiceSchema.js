import { schema } from 'normalizr';

export const invoice = new schema.Entity('invoices');

export const invoiceCollection = [ invoice ];
