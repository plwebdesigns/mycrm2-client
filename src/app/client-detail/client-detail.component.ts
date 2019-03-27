import {Component, Input, OnInit} from '@angular/core';
import {Client, ClientService} from "../client.service";
import { ActivatedRoute, Route } from "@angular/router";

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input() client: Client;

  constructor(
      private clientService: ClientService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.findClient();
  }

  findClient() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.findClient(id)
        .subscribe((client: any) => { this.client = client.data; });
  }

}
