import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../models/invoice';

export interface InvoiceForm extends Invoice {
  id: number;
}

@Component({
   selector: 'app-invoice-form',
   templateUrl: './invoice-form.component.html',
   styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {


   constructor() {
   }

   ngOnInit(): void {
   }

}
