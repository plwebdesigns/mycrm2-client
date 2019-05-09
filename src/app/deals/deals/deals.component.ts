import { Component, OnInit } from '@angular/core';
import {Deal, DealService} from "../../deal.service";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  deals: Deal[];

  constructor(private dealService: DealService) { }

  ngOnInit() {
    this.getDeals();
  }

  getDeals() {
    let seq = this.dealService.getDeals();
    seq.subscribe((deals: any) => {this.deals = deals.data});
  }

}
