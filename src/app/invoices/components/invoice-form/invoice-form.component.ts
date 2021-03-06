import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from '../../services/invoice.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Invoice} from '../../models/invoice';
import {ClientService} from 'src/app/clients/services/client.service';
import {Client} from 'src/app/clients/models/client';

@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   clients: Client[] = [];
   routeId: string | null;
   private invoice: Invoice;
   isEditMode: boolean;
   invoiceForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private invoiceService: InvoiceService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private clientService: ClientService) {
   }

   ngOnInit() {
      this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
      this.isEditMode = !!this.routeId;
      this.createForm();
      this.displayInvoiceOnForm();
      this.setClients();
   }

   private displayInvoiceOnForm() {
      this.activatedRoute.data.subscribe(data => {
         this.invoice = data['invoice'];
         if(this.invoice.client) {
            this.invoiceForm.patchValue({
               client: this.invoice.client._id
            });
         }
         this.invoiceForm.patchValue({
            item: this.invoice.item,
            quantity: this.invoice.quantity,
            amount: this.invoice.amount,
            tax: this.invoice.tax,
            date: this.invoice.date,
            dueDate: this.invoice.dueDate
         });
      });
   }

   private createForm() {
      this.invoiceForm = this.fb.group({
         item: ['', Validators.required],
         quantity: ['', Validators.required],
         amount: '',
         tax: '',
         date: ['', Validators.required],
         dueDate: ['', Validators.required],
         client: ['', Validators.required],
      })
   }

   async onSubmit() {
      if (this.invoice) { // means user wants to update form
         this.invoiceService.updateInvoice(this.routeId, this.invoiceForm.value).subscribe(async invoice => {
            this._snackBar.open('Invoice updated', 'Success', {duration: 2000});
            await this.router.navigate(['dashboard', 'invoices']);
         }, error => {
            this.errorHandler(error, 'Failed to update invoice');
         });
      } else {
         this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(async () => {
            this._snackBar.open('Invoice created', 'Success', {
               duration: 2000,
            });
            this.invoiceForm.reset();
            await this.router.navigate(['dashboard', 'invoices']);
         }, error => {
            this.errorHandler(error, 'Error creating invoice');
         });
      }
   }

   openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
   }

   private errorHandler(error: any, displayMessage: string) {
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {
         duration: 2000,
      });
   }

   async onCancel() {
      this.invoiceForm.reset();
      await this.router.navigate(['dashboard', 'invoices']);
   }

   setClients() {
      this.clientService.getAllClients().subscribe({
         next: clients => {
            this.clients = clients;
         },
         error: error => {
            this.errorHandler(error, 'Failed to get clients');
         }
      });
   }
}
