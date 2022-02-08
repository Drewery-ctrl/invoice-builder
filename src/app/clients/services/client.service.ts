import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/client';

const BASE_URL = 'http://localhost:3001/api/v1';

@Injectable({
   providedIn: 'root'
})
export class ClientService {

   constructor(private httpClient: HttpClient) {
   }

   getAllClients(): Observable<Client[]> {
      return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
   }
}
