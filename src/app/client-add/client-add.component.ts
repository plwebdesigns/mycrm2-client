import { Component, OnInit, Output } from '@angular/core';
import {Client, ClientService} from "../client.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  @Output() client: Client;
  clientForm: FormGroup;

  constructor(
      private clientService: ClientService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.clientForm = this.fb.group({
      first_name: [],
      last_name: [],
      status: [],
      address_1: [],
      address_2: [],
      city: [],
      state: [],
      zipcode: [],
      phone_1: [],
      phone_2: [],
      dob: [],
      ssn: [],
      notes: []
    });
  }

  addClient(client) {
    client = this.clientForm.value;
    this.clientService.addClient(client)
        .subscribe((cx: any) => { this.client = cx});
    console.warn(client);
  }

}
