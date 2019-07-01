import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from "./clients/clients.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";
import { ClientAddComponent } from "./client-add/client-add.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DealDetailComponent } from "./deals/deal-detail/deal-detail.component";
import { DealsComponent } from "./deals/deals/deals.component";
import { DealAddComponent } from "./deals/deal-add/deal-add.component";
import { EmployeesComponent } from './admin/components/employees/employees.component';


const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
  { path: 'client-add', component: ClientAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'deals/:id', component: DealDetailComponent },
  { path: 'deal-add', component: DealAddComponent },
  { path: 'admin', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
