import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Client } from './client.service';
import { catchError, map } from 'rxjs/operators';

export interface FileUpload {
  fileInput: File;
  id: number;
}

let httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/pdf'})
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private API_URL = 'https://longoapi.com/api/clients/'

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
          `Laravel API returned code ${error.status}, ` +
          `Message: ${error.error}`

      );
    }
    // return an observable with a user-facing error message
    return throwError(
        error.message);
  };

  constructor(private http: HttpClient) { };
  
  uploadFile(id: number, fileInput: File): Observable<any> {
    let body: FormData = new FormData();
    body.append("fileInput", fileInput );
    
    return this.http.post(this.API_URL + id, body, {responseType: 'text'})
    .pipe(catchError(this.handleError))
  }
}
