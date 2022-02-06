import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {remove} from "lodash";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
   selector: 'app-invoice-listing',
   templateUrl: './invoice-listing.component.html',
   styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   displayedColumns: string[] = ['ITEM', 'AMOUNT', 'QUANTITY', 'TAX', 'DATE', 'DUE DATE', 'ACTIONS'];
   dataSource: Invoice[] = [];
   resultsLength = 0;
   isLoadingResults = false;

   constructor(private invoiceService: InvoiceService, private _router: Router, private _snackBar: MatSnackBar) {
   }

   ngOnInit() {
      this.populateInvoices();
   }

   ngAfterViewInit() {
      // If user clicks arrow next button request is made to get next page
      this.paginator.page.subscribe(async (event) => {
         this.isLoadingResults = true;
         return this.invoiceService.getInvoices({
            page: ++event.pageIndex,
            perPage: event.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
         }).subscribe({
            next: invoices => {
               this.dataSource = invoices.docs;
               this.resultsLength = invoices.total;
            },
            error: err => {
               this.errorHandler(err, 'Failed to load invoices');
            },
            complete: () => {
               this.isLoadingResults = false;
            }
         });
      });

      // handles sorting in the table
      this.sort.sortChange.subscribe(() => {
         this.paginator.pageIndex = 0;
         this.paginator.page.next({
            pageIndex: 0,
            pageSize: this.paginator.pageSize,
            length: this.resultsLength
         });
         this.isLoadingResults = true;
         return this.invoiceService.getInvoices({
            page: this.paginator.pageIndex + 1,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
         }).subscribe({
            next: invoices => {
               this.dataSource = invoices.docs;
               this.resultsLength = invoices.total;
            },
            error: err => {
               this.errorHandler(err, 'Failed to sort invoices');
            },
            complete: () => {
               this.isLoadingResults = false;
            }
         });
      });
   }

   populateInvoices() {
      this.isLoadingResults = true;
      this.invoiceService.getInvoices({
         page: 1,
         perPage: 10,
         sortField: this.sort.active,
         sortDir: this.sort.direction,
         filter: ''
      }).subscribe({
         next: invoices => {
            this.dataSource = invoices.docs;
            this.resultsLength = invoices.total;
            this.isLoadingResults = false;
         },
         error: err => {
            this.errorHandler(err, 'Failed to load invoices');
         },
         complete: () => {
            this.isLoadingResults = false;
         }
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
      this.isLoadingResults = false;
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {duration: 2000});
   }

   async editInvoiceHandler(invoiceId: Event) {
      await this._router.navigate(['dashboard', 'invoices', invoiceId]);
   }

   applyFilter(filterValue: KeyboardEvent) {
      this.paginator.pageIndex = 0;
      const valueToFilter = (filterValue.target as HTMLInputElement).value.trim();
      this.invoiceService.getInvoices({
         page: this.paginator.pageIndex + 1,
         perPage: this.paginator.pageSize,
         sortField: this.sort.active,
         sortDir: this.sort.direction,
         filter: valueToFilter
      }).subscribe({
         next: invoices => {
            this.dataSource = invoices.docs;
            this.resultsLength = invoices.total;
         },
         error: err => {
            this.errorHandler(err, 'Failed to filter invoices');
         },
         complete: () => {
            this.isLoadingResults = false;
         }
      });
   }
}
