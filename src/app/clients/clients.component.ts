import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from "../client.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();

  }

  getClients() {
    this.clientService.getClients()
        .subscribe((clients: any) => { this.clients  = clients.data } )
  }

}
