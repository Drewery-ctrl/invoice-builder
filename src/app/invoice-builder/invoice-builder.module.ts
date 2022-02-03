import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoicesComponent } from './invoices.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import {MaterialModule} from "../shared/material.module";


@NgModule({
  declarations: [
    InvoicesComponent,
    MainContentComponent,
    SideNavComponent,
    ToolBarComponent
  ],
   imports: [
      CommonModule,
      InvoiceBuilderRoutingModule,
      MaterialModule
   ]
})
export class InvoiceBuilderModule { }
