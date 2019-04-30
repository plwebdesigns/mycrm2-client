import { Component, OnInit } from '@angular/core';
import {LoginService, User} from "../login.service";
import {FormBuilder, FormGroup, Validators, NgModel} from "@angular/forms";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User[];
  signUpForm: FormGroup;

  constructor(
      private logServ: LoginService, private  fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      phone_1: ['', [Validators.required, Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
      email: ['', Validators.required],
      password:['', Validators.required],
      confirm_password: ['', Validators.required]
    })
  }

  get f() { return this.signUpForm.controls };

  signUp(user) {
    const sub = this.logServ.signUp(user);
    sub.subscribe(
        (user: any) => { this.user = user},
        err => console.log('Error with signup ' + err),
        () => console.log('completed signup!!')
    );
    document.getElementById('modal-success').classList.toggle('is-active');
  }

  closeModal() {
    document.getElementById('modal-success').classList.toggle('is-active');
    this.signUpForm.reset();
  }

}
