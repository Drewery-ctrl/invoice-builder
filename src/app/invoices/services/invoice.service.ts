import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice, InvoicePaginatedResponse} from "../models/invoice";

const BASE_URL = 'http://localhost:3001/api/v1';

@Injectable({
   providedIn: 'root'
})
export class InvoiceService {

   constructor(private httpClient: HttpClient) {
   }

   getInvoiceById(id: string): Observable<Invoice> {
      return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
   }

   getInvoices({page, perPage, sortDir, sortField, filter}: { page: number, perPage: number, sortField: string, sortDir: string, filter: string }): Observable<InvoicePaginatedResponse> {
      let queryString = `${BASE_URL}/invoices?page=${page}&perPage=${perPage}`;
      if (sortField && sortDir) {
         queryString += `&sortField=${sortField}&sortDir=${sortDir}`;
      }
      if (filter) {
         queryString += `&filter=${filter}`;
      }
      return this.httpClient.get<InvoicePaginatedResponse>(queryString);
   }

   createInvoice(body: Invoice): Observable<Invoice> {
      return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body);
   }

   deleteInvoice(id: string): Observable<Invoice> {
      return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
   }

   updateInvoice(id: string | null, body: Invoice) {
      return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
   }
}
