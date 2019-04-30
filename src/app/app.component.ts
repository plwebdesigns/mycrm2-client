import { Component } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private loginService: LoginService, private router: Router){}

  get auth() { return this.loginService.isAuth}; //Convience method to access isAuth
  logout() {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      this.loginService.isAuth = false;
      this.router.navigate(['/login']);
    }
    else {
      alert('There\'s no user logged in right now');
    }
  }

}

