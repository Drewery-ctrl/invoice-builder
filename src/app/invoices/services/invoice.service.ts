import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/invoice";

const BASE_URL = 'http://localhost:3001/api/v1';

@Injectable({
   providedIn: 'root'
})
export class InvoiceService {

   constructor(private httpClient: HttpClient) {
   }

   getInvoices(): Observable<Invoice[]> {
      return this.httpClient.get<Invoice[]>(`${BASE_URL}/invoices`);
   }

   addInvoice() {
      return this.httpClient.post(`${BASE_URL}/invoices`, {});
   }
}
