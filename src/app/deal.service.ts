import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Deal {
  id: number;
  client_id: number;
  status: string;
  amt_client_recvd: number;
  profit: number;
  notes: string;
  created_at: string;
  updated_at: string;
  payments_purchased: number;
  payments_remaining: number;
  sales_person: string;
  transaction_date: string;
}

let options = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class DealService {

  constructor(
      private http: HttpClient
  ) { }

  private API_URL = 'https://longoapi.com/api/deals/';

  /* Function to retrieve all deals */
  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.API_URL, options);
  }

  /* Function to retrieve single deal */
  showDeal(id:number): Observable<Deal> {
    return this.http.get<Deal>(
        this.API_URL + id,
        options
        );
  }
  /* Function for updating deal in deal-detail */
  updateDeal(id: number, deal): Observable<Deal> {
    options.headers = options.headers.append('X-Http-Method-Override', 'PUT');
    return this.http.post<Deal>(this.API_URL + id, deal, options);
  }
  
}
