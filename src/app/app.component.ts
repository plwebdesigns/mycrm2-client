import { Component } from '@angular/core';
import {LoginService} from "./login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private loginService: LoginService){}

  logout() {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
    }
    else {
      alert('There\'s no user logged in right now');
    }
  }

}

