import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { LoginService, User } from "../login.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

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
    private router: Router,
    private cdetector: ChangeDetectorRef) { }

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
    setTimeout(() => {
      subscription.subscribe((token: any) => { this.tk = token.token },
        err => {
          console.log('Error with login ' + err.message),
          err.status == 403 ? alert('Incorrect username/password') : {}
        },
        () => {
          this.loginService.isAuth = true;
          this.loginService.isAdminAuth = true;
          this.router.navigate(['/']);
          this.cdetector.markForCheck();
        })
    }, 500);

  }

}
