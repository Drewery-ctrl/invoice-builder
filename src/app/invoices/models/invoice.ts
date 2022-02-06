export class Invoice {
   _id: string;
   item: string;
   amount: number;
   tax: number;
   quantity: number;
   date: Date;
   dueDate: Date;
}


export class InvoicePaginatedResponse {
   docs: Invoice[] = [];
   total: number;
   page: number;
   pages: number;
   limit: number;
}
