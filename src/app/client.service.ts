import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

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
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const myHeaders = {
  headers: new HttpHeaders({'X-HTTP-Method-Override': 'PUT'})
};

@Injectable({
  providedIn: 'root'
})



export class ClientService {

  private API_URL = 'http://localhost:8000/api/clients/'; // URL to laravel API

  constructor(private http: HttpClient) { }

  /** GET clients from the server */
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL, httpOptions);
  }

  searchClient(term): Observable<Client[]> {

    return this.http.get<Client[]>(this.API_URL, httpOptions);
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
