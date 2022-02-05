import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from '../../services/invoice.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Invoice} from '../../models/invoice';


@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   private invoice: Invoice;
   hasPrivateData: boolean = false;
   invoiceForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private invoiceService: InvoiceService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.createForm();
      this.displayInvoiceOnForm();
   }

   private displayInvoiceOnForm() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
         this.invoiceService.getInvoiceById(id).subscribe(invoice => {
            this.invoice = invoice;
            this.hasPrivateData = true;
            this.invoiceForm.patchValue(invoice);
         }, error => {
            this.errorHandler(error, 'Failed to get invoice');
         });
      }
   }

   private createForm() {
      this.invoiceForm = this.fb.group({
         item: ['', Validators.required],
         quantity: ['', Validators.required],
         amount: '',
         tax: '',
         date: ['', Validators.required],
         dueDate: ['', Validators.required],
      })
   }

   async onSubmit() {
      if (this.invoice) { // means user wants to update form
         const id = this.route.snapshot.paramMap.get('id');
         this.invoiceService.updateInvoice(id, this.invoiceForm.value).subscribe(async invoice => {
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
}
