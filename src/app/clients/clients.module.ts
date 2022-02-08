import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientListingComponent} from './components/client-listing/client-listing.component';
import {MaterialModule} from "../shared/material.module";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ClientService} from "./services/client.service";
import {ClientFormDialog} from "./components/client-form-dialog.component";


@NgModule({
   declarations: [
      ClientListingComponent,
      ClientFormDialog
   ],
   imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      HttpClientModule,
   ],
   exports: [ClientListingComponent],
   providers: [ClientService],
   entryComponents: [ClientFormDialog]
})
export class ClientsModule {
}
