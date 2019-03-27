import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from "./clients/clients.component";
import {ClientDetailComponent} from "./client-detail/client-detail.component";

const routes: Routes = [
  {path: '', component: ClientsComponent},
  {path: 'clients/:id', component: ClientDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
