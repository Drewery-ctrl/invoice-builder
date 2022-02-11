import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Invoice} from '../../models/invoice';

@Component({
   selector: 'app-invoice-view',
   templateUrl: './invoice-view.component.html',
   styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
   invoice: Invoice;

   constructor(private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.activatedRoute.data.subscribe(data => {
         this.invoice = data['invoice'];
         console.log(this.invoice);
      })
   }

   onEdit() {
      console.log('Edit');
   }

   onDelete() {
      console.log('Delete');
   }
}
