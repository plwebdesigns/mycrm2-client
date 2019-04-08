import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from "../client.service";





@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  links: [];
  page: string = 'http://localhost:8000/api/clients?page=1';




  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    const seq = this.clientService.getClients(this.page);
    seq.subscribe((clients: any) => { this.clients  = clients.data });
    setTimeout(() => {seq.subscribe((lx: any) => {this.links = lx.links},
            err => console.log('Observer error: ' + err),
        () => console.log(this.page))}, 500);
  }

  searchClients(term: string) {
    this.clientService.searchClient(term)
        .subscribe((clients: any) => { this.clients = clients.data });
  }

  pageForward() {
    this.page = this.links['next'];
    this.getClients();
    alert('testing....1234');
  }
  pageBack() {
    this.page = this.links['prev'];
    alert('testing....1234');
  }

}
