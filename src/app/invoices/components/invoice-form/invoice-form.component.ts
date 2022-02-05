import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {InvoiceService} from '../../services/invoice.service';


@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   invoiceForm: FormGroup;

   constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
   }

   ngOnInit() {
      this.createForm();
   }

   createForm() {
      this.invoiceForm = this.fb.group({
         item: '',
         quantity: '',
         amount: '',
         tax: '',
         date: '',
         dueDate: ''
      })
   }

   onSubmit() {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(res => {
         this.invoiceForm.reset();
         console.log(res);
      });
   }
}
