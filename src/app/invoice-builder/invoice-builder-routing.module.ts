import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesComponent} from './invoices.component';
import {MainContentComponent} from "./components/main-content/main-content.component";

const routes: Routes = [
   {
      path: '',
      component: InvoicesComponent,
      children: [
         {
            path: '',
            component: MainContentComponent
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InvoiceBuilderRoutingModule {
}
