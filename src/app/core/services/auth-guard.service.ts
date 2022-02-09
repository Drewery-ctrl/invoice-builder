import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {JwtService} from './jwt.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

   constructor(private jwtService: JwtService, private router: Router) {
   }

   async canActivate(): Promise<boolean> {
      if (this.jwtService.isLoggedIn()) {
         return true;
      } else {
         await this.router.navigate(['/login']);
         return false;
      }
   }

   async canActivateChild(): Promise<boolean> {
      return await this.canActivate();
   }
}
