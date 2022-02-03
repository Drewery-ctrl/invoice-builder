import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
   {path: '', component: AppComponent, pathMatch: 'full'},
   {path: 'invoices', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
   {path: '**', redirectTo: 'invoices', pathMatch: 'full'},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}

