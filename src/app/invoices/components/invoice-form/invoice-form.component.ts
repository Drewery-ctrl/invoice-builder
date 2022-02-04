import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   invoiceForm: FormGroup;

   constructor(private fb: FormBuilder) {
   }

   ngOnInit(){
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
      debugger;
      console.log(this.invoiceForm.value);
   }
}
