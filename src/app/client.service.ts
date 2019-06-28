import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';



export interface Client {
  id: number;
  status: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_1: string;
  phone_2: string;
  dob: string;
  ssn: string;
  notes: string;
  created_at: string;
  updated_at: string;
  fileName: File;
  deal_id: [{
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
  }];
  files: [{
    id: number;
    name: string;
    client_id: number;
  }];
}


let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const headersDelete = {
  headers: new HttpHeaders({ 'X-HTTP-Method-Override': 'DELETE' })
};

const myHeaders = {
  headers: new HttpHeaders({ 'X-HTTP-Method-Override': 'PUT' }),
};




@Injectable({
  providedIn: 'root'
})



export class ClientService {

  private API_URL = 'https://longoapi.com/api/clients/'; // URL to laravel API


  private handleError(error: HttpErrorResponse) {
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


  constructor(private http: HttpClient) { }


  /** GET clients from the server */
  getClients(page: string): Observable<Client[]> {
    return this.http.get<Client[]>(page, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  //Search clients using term
  searchClient(term: string, by: string): Observable<Client[]> {
    const myParams = { params: new HttpParams().set('search', term) };
    myParams.params = myParams.params.append('by', by);
    return this.http.get<Client[]>(this.API_URL + 'search', myParams);
  }
  //Sort clients by sortfield
  sortClients(sortField): Observable<Client> {
    const myParams = sortField ? { params: new HttpParams().set('sortField', sortField) } :
      { headers: new HttpHeaders().set('Content-Type', 'Application/json') };
    return this.http.get<Client>(this.API_URL + 'sort', myParams)
      .pipe(
        catchError(this.handleError)
      )
  }

  /** GET single client from the server */
  findClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.API_URL + id, httpOptions);
  }

  /** POST client to the server */
  addClient(client): Observable<Client> {
    return this.http.post<Client>(this.API_URL, client);
  }

  /** PUT(update) client to server */
  updateClient(id: number, client): Observable<Client> {
    return this.http.post<Client>(this.API_URL + id, client, myHeaders)
      .pipe(catchError(this.handleError));
  };

  /** DESTROY(delete) client from server */
  deleteClient(id: number, client): Observable<Client> {
    return this.http.post<Client>(this.API_URL + id, client, headersDelete);
  }


}
