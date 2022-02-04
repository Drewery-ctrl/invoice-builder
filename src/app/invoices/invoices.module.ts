import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceListingComponent} from './components/invoice-listing/invoice-listing.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material.module';
import {HttpClientModule} from "@angular/common/http";
import {InvoiceService} from './services/invoice.service';


@NgModule({
   declarations: [InvoiceListingComponent],
   imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      MaterialModule,
   ],
   exports: [InvoiceListingComponent],
   providers: [InvoiceService],
})
export class InvoicesModule {
}
