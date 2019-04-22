import {Component, OnInit, Output} from '@angular/core';
import {LoginService, User} from "../login.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() user: User;
  loginForm: FormGroup;
  tk: string;

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  login(user) {
    user = this.loginForm.value;
    const subscription = this.loginService.login(user);
    subscription
        .subscribe((ux: any) => { this.user = ux });
    setTimeout(() => { subscription.subscribe((token: any) => { this.tk = token.token },
        err => console.log('Error ' + err))}, 500);
    this.router.navigate(['/']);
  }

}
