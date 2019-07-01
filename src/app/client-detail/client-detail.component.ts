import { Component, Input, OnInit, Output } from '@angular/core';
import { Client, ClientService } from "../client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UploadService } from "../upload.service";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client;
  uploadForm: FormGroup;


  constructor(
    private clientService: ClientService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.findClient();
    this.uploadForm = this.fb.group({
      fileInput: ['']
    })
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
      .subscribe(
        (cx: any) => { client = cx; },
        err => console.log('Observer error with updateClient() ' + err),
        () => this.toggleModal());
  }

  deleteClient(client) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.deleteClient(id, client)
      .subscribe(
        (cx: any) => { client = cx },
        err => console.log('Error with deleteClient, message: ', err.error.message),
        () => { alert(`Client with ${id} was deleted!`); this.router.navigate(['/']) });
  }

  toggleModal() {
    document.getElementById('modal-success').classList.toggle('is-active');
  }



  onChange() {
    let selectedFile = (<any>document).getElementById('fileInput').files[0];
    const id = +this.route.snapshot.paramMap.get('id');
    let sub = this.uploadService.uploadFile(id, selectedFile);
    sub.subscribe(
      (file: any) => { },
      err => ('Something went wrong in onChange()'),
      () => this.toggleModal()
    );
  }


}
