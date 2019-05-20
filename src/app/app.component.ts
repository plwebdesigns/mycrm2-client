import { Component } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import { expand } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private loginService: LoginService, private router: Router){}

  get auth() { return this.loginService.isAuth}; //Convience method to access isAuth
  get adminAuth() { return this.loginService.isAdminAuth}; //Convience method to addcess isAdminAuth

  logout() {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      this.loginService.isAuth = false;
      this.loginService.isAdminAuth = false;
      this.router.navigate(['/login']);
    }
    else {
      alert('There\'s no user logged in right now');
    }
  }

  smallScreen() {
      document.getElementById('burger').classList.toggle('is-active');
  }

}

