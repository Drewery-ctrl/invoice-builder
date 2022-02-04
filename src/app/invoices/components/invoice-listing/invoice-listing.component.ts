import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";

@Component({
   selector: 'app-invoice-listing',
   templateUrl: './invoice-listing.component.html',
   styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

   constructor(private invoiceService: InvoiceService) {
   }

   ngOnInit() {
      this.invoiceService.getInvoices().subscribe(invoices => {
         console.log(invoices);
      });
   }
}
