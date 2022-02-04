import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";

@Component({
   selector: 'app-invoice-listing',
   templateUrl: './invoice-listing.component.html',
   styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
   displayedColumns: string[] = ['ITEM', 'AMOUNT', 'QUANTITY', 'TAX', 'DATE', 'DUE DATE', 'ACTIONS'];
   dataSource: Invoice[] = [];

   constructor(private invoiceService: InvoiceService) {
   }

   ngOnInit() {
      this.invoiceService.getInvoices().subscribe(invoices => {
         this.dataSource = invoices;
         // console.log(invoices);
      });
   }

   addInvoice() {
      this.invoiceService.addInvoice();
   }
}
