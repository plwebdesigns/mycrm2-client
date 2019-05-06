import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpHeaders,
    HttpErrorResponse,
    HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";



@Injectable()
export class Token implements HttpInterceptor{

    constructor(private router: Router, private loginServ: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            if (sessionStorage.getItem('token')) {
                this.loginServ.isAuth = true;
                const token = sessionStorage.getItem('token');
                // Set authorization header to contain Bearer token
                let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
                headers = headers.append('Content-Type', 'Application/json');

                // If post req is really PUT, add header
                if (req.headers.has('X-Http-Method-Override')) {
                    const value = req.headers.get('X-HTTP-Method-Override');
                    headers = headers.append('X-HTTP-Method-Override', value);
                }
                const customReq = req.clone({headers: headers});

                return next.handle(customReq);
            }
            else {
                return next.handle(req).do((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            // Do something with the response
                            if (event.headers.has('Authorization')) {
                                const token = event.headers.get('Authorization');
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
