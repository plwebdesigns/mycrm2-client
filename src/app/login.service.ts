import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


export interface User {
  email: string;
  password: string;
}

let httpOptions = {
  headers: new HttpHeaders(
      {'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = 'http://74.208.150.203/api/users/login';


  constructor(private http: HttpClient) { }


  login(user): Observable<User> {
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }
}
