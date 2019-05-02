import { Component, OnInit, Output } from '@angular/core';
import {Client, ClientService} from "../client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      first_name: ['', [Validators.maxLength(50), Validators.required]],
      last_name: ['', [Validators.maxLength(50), Validators.required]],
      status: ['', [Validators.maxLength(50)]],
      address_1: ['', [Validators.maxLength(100)]],
      address_2: ['', [Validators.maxLength(100)]],
      city: ['', [Validators.maxLength(50)]],
      state: ['', [Validators.maxLength(2)]],
      zipcode: ['', [Validators.maxLength(5)]],
      phone_1: ['', [Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
      phone_2: ['', [Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
      dob: [],
      ssn: ['', [Validators.maxLength(12)]],
      notes: []
    });
  }

  addClient(client) {
    client = this.clientForm.value;
    this.clientService.addClient(client)
        .subscribe((cx: any) => { this.client = cx},
                err => console.log('Observer error: ' + err),
            () => alert('Client added'));
  }

}
