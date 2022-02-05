import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from '../../services/invoice.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   invoiceForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private invoiceService: InvoiceService,
      private _snackBar: MatSnackBar,
      private router: Router) {
   }

   ngOnInit() {
      this.createForm();
   }

   createForm() {
      this.invoiceForm = this.fb.group({
         item: ['', Validators.required],
         quantity: ['', Validators.required],
         amount: '',
         tax: '',
         date: ['', Validators.required],
         dueDate: ['', Validators.required],
      })
   }

   onSubmit() {
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

   openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
   }

   private errorHandler(error: any, displayMessage: string) {
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {
         duration: 2000,
      });
   }
}
