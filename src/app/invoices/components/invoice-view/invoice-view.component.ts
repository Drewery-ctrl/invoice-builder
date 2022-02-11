import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Invoice} from '../../models/invoice';

@Component({
   selector: 'app-invoice-view',
   templateUrl: './invoice-view.component.html',
   styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
   invoice: Invoice;
   total: number;
   salesTax = 0;

   constructor(private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.activatedRoute.data.subscribe(data => {
         this.invoice = data['invoice'];
         console.log(this.invoice);

         if (typeof this.invoice.quantity !== "undefined" && typeof this.invoice.amount !== "undefined") {
            this.total = this.invoice.quantity * this.invoice.amount;
         }
         if (typeof this.invoice.tax !== "undefined") {
            this.salesTax = this.invoice.tax / 100 * this.total;
         }
         this.total += this.salesTax;
      })
   }

   onEdit() {
      console.log('Edit');
   }

   onDelete() {
      console.log('Delete');
   }
}
