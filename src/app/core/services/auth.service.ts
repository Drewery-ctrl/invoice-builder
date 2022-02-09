import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {LoginResponse, SignupResponse, User} from "../models/user";

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private httpClient: HttpClient) {
   }

   login(user: User): Observable<LoginResponse> {
      return this.httpClient.post<LoginResponse>(`${environment.api_url}/users/login`, user);
   }

   signup(body: User): Observable<SignupResponse> {
      return this.httpClient.post<SignupResponse>(`${environment.api_url}/users/signup`, body);
   }
}
