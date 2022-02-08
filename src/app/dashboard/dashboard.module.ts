import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {ToolBarComponent} from './components/tool-bar/tool-bar.component';
import {MaterialModule} from "../shared/material.module";
import {InvoicesModule} from "../invoices/invoices.module";
import {ClientsModule} from "../clients/clients.module";


@NgModule({
   declarations: [
      DashboardComponent,
      MainContentComponent,
      SideNavComponent,
      ToolBarComponent
   ],
   imports: [
      CommonModule,
      InvoicesModule,
      DashboardRoutingModule,
      MaterialModule,
      ClientsModule
   ]
})
export class DashboardModule {
}