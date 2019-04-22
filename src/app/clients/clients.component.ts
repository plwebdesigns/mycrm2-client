import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from "../client.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  links: [];
  page: string = 'http://my-crm2.herokuapp.com/api/clients?page=1'; // Pagination variable
  isLoading: boolean = true;



  constructor(
      private clientService: ClientService,
      private router: Router
      ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    const seq = this.clientService.getClients(this.page);
    seq.subscribe((clients: any) => { this.clients  = clients.data });
    setTimeout(() => {seq.subscribe((lx: any) => {this.links = lx.links},
        err => console.warn('Observer error from getClients() ' + err),
        () => this.isLoading = false)}, 800);
  }

  searchClients(term: string) {
    const subscription = this.clientService.searchClient(term);
    subscription
        .subscribe((clients: any) => { this.clients = clients.data });
  }

  pageForward() {
    this.page = this.links['next'];
    this.getClients();
  }
  pageBack() {
    this.page = this.links['prev'];
    this.getClients();
  }

}
