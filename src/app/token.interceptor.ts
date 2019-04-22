import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpHeaders,
    HttpErrorResponse, HttpEventType, HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";



@Injectable()
export class Token implements HttpInterceptor{

    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            if (sessionStorage.getItem('token')) {
                const token = sessionStorage.getItem('token');
                // Set authorization header to contain Bearer token
                let headers = new HttpHeaders().set('token', token);
                headers = headers.append('Content-Type', 'Application/json');

                // If post req is really PUT, add header
                if (req.headers.has('X-Http-Method-Override')) {
                    headers = headers.append('X-Http-Method-Override', 'PUT');
                }
                const customReq = req.clone({headers: headers});

                console.warn(customReq.headers.get('Content-type'));
                return next.handle(customReq);
            }
            else {
                return next.handle(req).do((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            // Do something with the response
                            if (event.headers.has('token')) {
                                const token = event.headers.get('token');
                                console.warn(token);
                                sessionStorage.setItem('token', token);
                            }


                        }
                    },
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status == 401 || err.status == 0) {
                                return this.router.navigate(['/login']);
                            }
                        }
                    });
            }
    }
}
