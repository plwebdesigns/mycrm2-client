import {Component, Input, Output, OnInit} from '@angular/core';
import {Client, ClientService} from "../client.service";
import {ActivatedRoute, Router} from "@angular/router";
import DateTimeFormat = Intl.DateTimeFormat;


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input() client: Client;


  constructor(
      private clientService: ClientService,
      private route: ActivatedRoute,
      private router: Router
      ) { }

  ngOnInit() {
    this.findClient();
  }

  findClient() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.findClient(id)
        .subscribe((client: any) => { this.client = client.data; });
  }

  updateClient(client) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.client.updated_at = new Date().toDateString();
    this.clientService.updateClient(id, client)
        .subscribe((cx: any) => { client = cx; },
            err => console.log('Observer error with updateClient() ' + err),
            () => this.toggleModal());
  }

  deleteClient(client) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.deleteClient(id, client)
        .subscribe((cx: any) => { client = cx },
            err => console.log('Error with delete client ID', err),
            () => {alert(`Client with ${id} was deleted!`); this.router.navigate(['/'])});
  }

  toggleModal() {
    document.getElementById('modal-success').classList.toggle('is-active');
  }

}
