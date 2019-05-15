import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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

  private handleError(error: HttpErrorResponse, obj: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`

      );
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
  };

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

  addDeal(deal): Observable<Deal>{
    return this.http.post<Deal>(this.API_URL, deal, options)
        .pipe(catchError(this.handleError));
  }
  
}
