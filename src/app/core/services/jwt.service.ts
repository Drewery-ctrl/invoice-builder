import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class JwtService {

   constructor() {
   }

   getToken(): string {
      return <string>window.localStorage.getItem('jwt_token');
   }

   setToken(token: string): void {
      window.localStorage.setItem('jwt_token', token);
   }

   destroyToken(): void {
      window.localStorage.removeItem('jwt_token');
   }
}
