import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Invoice} from '../../models/invoice';
import {saveAs} from 'file-saver';
import {InvoiceService} from '../../services/invoice.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
   selector: 'app-invoice-view',
   templateUrl: './invoice-view.component.html',
   styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
   isLoadingResults = false;
   invoice: Invoice;
   total: number;
   salesTax = 0;

   constructor(
      private activatedRoute: ActivatedRoute,
      private invoiceService: InvoiceService,
      private _snackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.activatedRoute.data.subscribe(data => {
         this.invoice = data['invoice'];

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

   downloadHandler(_id: string) {
      this.isLoadingResults = true;
      this.invoiceService.downloadInvoice(_id).subscribe({
         next: (data) => {
            console.log(data);
            const file = new Blob([data], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            saveAs(file, this.invoice.item);
            // window.open(fileURL, '_blank');
         },
         error: (error) => {
            this.errorHandler(error, 'Error downloading invoice');
         },
         complete: () => {
            this.isLoadingResults = false;
         }
      });
   }

   private errorHandler(error: any, message?: string) {
      console.log(error);
      this.isLoadingResults = false;
      this._snackBar.open(message ?? error.message, 'Error', {duration: 2000})
   }
}
