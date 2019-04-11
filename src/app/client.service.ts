import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";


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
}





let httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const myHeaders = {
  headers: new HttpHeaders({'X-HTTP-Method-Override': 'PUT'}),
};


@Injectable({
  providedIn: 'root'
})



export class ClientService {

  private API_URL = 'http://localhost:8000/api/clients/'; // URL to laravel API



  constructor(private http: HttpClient) { }


  /** GET clients from the server */
  getClients(page: string): Observable<Client[]> {
    return this.http.get<Client[]>(page, httpOptions);
  }

  searchClient(term: string): Observable<Client[]> {
    console.log(httpOptions);
    return this.http.get<Client[]>(
        this.API_URL
        + 'search/?search='
        + term.toUpperCase(), httpOptions);
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
    return this.http.post<Client>(this.API_URL + id, client, myHeaders);
  }

}
