import {Component, OnInit} from '@angular/core';
import {DealService} from "../../deal.service";
import {Location} from "@angular/common";
import {Model} from "./model";


@Component({
  selector: 'app-deal-add',
  templateUrl: './deal-add.component.html',
  styleUrls: ['./deal-add.component.css']
})
export class DealAddComponent implements OnInit {

  d = new Date().toDateString();

  model = new Model(
    undefined, undefined,undefined,undefined,
    undefined, undefined,undefined,
    undefined, undefined, undefined,
    undefined, undefined, this.d,
    this.d
  );

  constructor(
      private dealService: DealService,
      private location: Location
  ) { }

  ngOnInit() {

  }

  addDeal(deal){
    const seq = this.dealService.addDeal(deal);
    seq.subscribe(
        (dx: any) => { deal = dx},
        err => console.warn('addDeal() error ' + err ),
        () => this.toggleModal()
    );

  }

  goBack(): void {
    this.location.back();
  }

  toggleModal() {
    document.getElementById('modal-success').classList.toggle('is-active');
  }

}
