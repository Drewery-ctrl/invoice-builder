import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from "../models/user";

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private httpClient: HttpClient) {
   }

   login(user: User): Observable<User> {
      return this.httpClient.post<User>(`${environment.api_url}/users/login`, user);
   }
}
