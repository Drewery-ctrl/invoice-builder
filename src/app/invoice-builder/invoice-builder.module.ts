import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoicesComponent } from './invoices.component';


@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoiceBuilderRoutingModule
  ]
})
export class InvoiceBuilderModule { }
