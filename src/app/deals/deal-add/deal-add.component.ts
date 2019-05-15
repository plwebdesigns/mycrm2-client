import {Component, OnInit} from '@angular/core';
import {Deal, DealService} from "../../deal.service";
import {Location} from "@angular/common";
import {Model} from "./model";


@Component({
  selector: 'app-deal-add',
  templateUrl: './deal-add.component.html',
  styleUrls: ['./deal-add.component.css']
})
export class DealAddComponent implements OnInit {

  model = new Model();

  constructor(
      private dealService: DealService,
      private location: Location,
  ) { }

  ngOnInit() {

  }

  addDeal(deal){
    console.warn(deal);
    const seq = this.dealService.addDeal(deal);
    seq.subscribe(
        (dx: any) => { deal = dx},
        err => console.warn('addDeal() error ' + err ),
        () => console.log('successfully added!')
    );

  }

  goBack(): void {
    this.location.back();
  }

}
