import {Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {remove} from "lodash";
import {MatPaginator} from '@angular/material/paginator';

@Component({
   selector: 'app-invoice-listing',
   templateUrl: './invoice-listing.component.html',
   styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   displayedColumns: string[] = ['ITEM', 'AMOUNT', 'QUANTITY', 'TAX', 'DATE', 'DUE DATE', 'ACTIONS'];
   dataSource: Invoice[] = [];
   resultsLength = 0;

   constructor(private invoiceService: InvoiceService, private _router: Router, private _snackBar: MatSnackBar) {
   }

   async ngOnInit() {
      this.paginator.page.subscribe(async (event) => {
         this.invoiceService.getInvoices({page: ++event.pageIndex, perPage: event.pageSize}).subscribe(invoices => {
            this.dataSource = invoices.docs;
            this.resultsLength = invoices.total;
         })
      });
      await this.populateInvoices();
   }

   async populateInvoices() {
      this.invoiceService.getInvoices({page: 1, perPage: 10}).subscribe(invoices => {
         this.resultsLength = invoices.docs.length;
         this.dataSource = invoices.docs;
      }, error => {
         this.errorHandler(error, 'Failed to load invoices');
      });
   }


   async createInvoiceHandler() {
      await this._router.navigate(['dashboard', 'invoices', 'new']);
   }

   async deleteInvoiceHandler(id: string) {
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

   async editInvoiceHandler(invoiceId: any) {
      await this._router.navigate(['dashboard', 'invoices', invoiceId]);
   }
}
