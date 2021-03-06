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
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from "../core/services/http-interceptor.service";


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
   ],
   providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}]
})
export class DashboardModule {
}
