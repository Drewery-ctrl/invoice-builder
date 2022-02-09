import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {InvoiceService} from './invoice.service';

@Injectable({
   providedIn: 'root'
})
export class EditInvoiceResolverService implements Resolve<any> {

   constructor(private invoiceService: InvoiceService, private router: Router) {
   }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      let invoiceId = route.paramMap.get('id');
      return this.invoiceService.getInvoiceById(invoiceId).pipe(catchError(async error => {
         await this.router.navigate(['/dashboard', 'invoices']);
         return of(error);
      }));
   }
}
