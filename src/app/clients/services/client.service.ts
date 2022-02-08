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

   getAllClients(): Observable<{ clients: Client[] }> {
      return this.httpClient.get<{ clients: Client[] }>(`${BASE_URL}/clients`);
   }

   getClientById(id: string): Observable<{ client: Client }> {
      return this.httpClient.get<{ client: Client }>(`${BASE_URL}/clients/${id}`);
   }

   createClient(client: Client): Observable<{ client: Client }> {
      return this.httpClient.post<{ client: Client }>(`${BASE_URL}/clients`, client);
   }

   updateClient(client: Client): Observable<{ client: Client }> {
      return this.httpClient.put<{ client: Client }>(`${BASE_URL}/clients/${client._id}`, client);
   }

   deleteClient(id: string): Observable<{ client: Client }> {
      return this.httpClient.delete<{ client: Client }>(`${BASE_URL}/clients/${id}`);
   }
}
