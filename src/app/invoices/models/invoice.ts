import {Client} from "src/app/clients/models/client";

export class Invoice {
   _id: string;
   item: string;
   amount: number;
   tax: number;
   quantity: number;
   date: Date;
   dueDate: Date;
   client: Client;
}


export class InvoicePaginatedResponse {
   docs: Invoice[] = [];
   total: number;
   page: number;
   pages: number;
   limit: number;
}
