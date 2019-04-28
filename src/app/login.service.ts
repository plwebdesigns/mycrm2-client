import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


export interface User {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_1: string;

}

let httpOptions = {
  headers: new HttpHeaders(
      {'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = 'https://longoapi.com/api/users/login';


  constructor(private http: HttpClient) { }


  login(user): Observable<User> {
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }

  signUp(user): Observable<User> {
    return this.http.post<User>(
        'https://longoapi.com/api/users/register',
        user,
        httpOptions
    );
  }

}
