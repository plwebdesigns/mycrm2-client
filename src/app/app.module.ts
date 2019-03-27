import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
