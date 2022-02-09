import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {NoAuthGuardService} from "./core/services/no-auth-guard.service";

const routes: Routes = [
   {path: '', component: AppComponent, pathMatch: 'full'},
   {path: 'login', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuardService]},
   {path: 'signup', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuardService]},
   {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
   {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}

