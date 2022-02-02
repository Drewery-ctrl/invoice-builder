import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
   {path: 'invoice-builder', loadChildren: () => import('../app/invoice-builder/invoice-builder.module').then(m => m.InvoiceBuilderModule)},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
