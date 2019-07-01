import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpInterceptor, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Token} from "./token.interceptor";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MustMatchDirective } from './must-match.directive';
import { DealDetailComponent } from './deals/deal-detail/deal-detail.component';
import { DealsComponent } from './deals/deals/deals.component';
import { DealAddComponent } from './deals/deal-add/deal-add.component';
import { EmployeesComponent } from './admin/components/employees/employees.component';





@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientAddComponent,
    LoginComponent,
    SignupComponent,
    MustMatchDirective,
    DealDetailComponent,
    DealsComponent,
    DealAddComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: Token, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
