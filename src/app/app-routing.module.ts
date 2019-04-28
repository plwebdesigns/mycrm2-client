import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from "./clients/clients.component";
import {ClientDetailComponent} from "./client-detail/client-detail.component";
import {ClientAddComponent} from "./client-add/client-add.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";


const routes: Routes = [
  {path: '', component: ClientsComponent},
  {path: 'clients/:id', component: ClientDetailComponent},
  {path: 'client-add', component: ClientAddComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
