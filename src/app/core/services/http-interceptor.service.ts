import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {JwtService} from './jwt.service';

@Injectable({
   providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

   constructor(private jwtService: JwtService, private router: Router) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headersConfig = {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Authorization': ''
      };

      const token = this.jwtService.getToken();

      if (token) {
         headersConfig['Authorization'] = `Bearer ${token}`;
      }

      const _req = req.clone({setHeaders: headersConfig})
      return next.handle(_req).pipe(
         catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
               this.jwtService.destroyToken();
               this.router.navigate(['/login']);
            }
            return throwError(error);
         })
      );
   }

}
