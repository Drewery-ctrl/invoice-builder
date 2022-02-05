import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {remove} from "lodash";

@Component({
   selector: 'app-invoice-listing',
   templateUrl: './invoice-listing.component.html',
   styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
   displayedColumns: string[] = ['ITEM', 'AMOUNT', 'QUANTITY', 'TAX', 'DATE', 'DUE DATE', 'ACTIONS'];
   dataSource: Invoice[] = [];

   constructor(private invoiceService: InvoiceService, private _router: Router, private _snackBar: MatSnackBar) {
   }

   ngOnInit() {
      this.invoiceService.getInvoices().subscribe(invoices => {
         this.dataSource = invoices;
      }, error => {
         this.errorHandler(error, 'Failed to load invoices');
      });
   }

   async addInvoice() {
      await this._router.navigate(['dashboard', 'invoices', 'new']);
   }

   async deleteInvoice(id: string) {
      await this.invoiceService.deleteInvoice(id).subscribe((invoice) => {
         remove(this.dataSource, (item) => {
            return item._id === invoice._id;
         });
         this.dataSource = [...this.dataSource];
         this._snackBar.open('Invoice deleted', 'Success', {duration: 2000});
      }, error => {
         this.errorHandler(error, 'Error deleting invoice');
      });
   }

   private errorHandler(error: any, displayMessage: string) {
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {
         duration: 2000,
      });
   }
}
