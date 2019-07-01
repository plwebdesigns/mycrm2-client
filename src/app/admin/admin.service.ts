import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Employee {
  id: number,
  first_name: string,
  last_name: string,
  address_1: string,
  address_2: string,
  city: string,
  state: string,
  zipcode: number,
  phone_1: string,
  ssn: string,
  status: string,
  department: string
}

const API_URL = 'https://longoapi.com/api/admin/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  // Handle Observer Errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. 
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }

    return throwError('Something bad happend, Oopsie');
  }


  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}users`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
