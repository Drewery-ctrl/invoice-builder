import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainContentComponent} from '../invoice/builder/components/main-content/main-content.component';
import {InvoicesComponent} from './invoices.component';

const routes: Routes = [
   {path: '', component: InvoicesComponent, children: [{path: '', component: MainContentComponent}]}
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InvoiceBuilderRoutingModule {
}
