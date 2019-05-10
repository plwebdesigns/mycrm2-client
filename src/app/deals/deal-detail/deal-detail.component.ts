import {Component, Input, OnInit} from '@angular/core';
import {Deal, DealService} from "../../deal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {

  @Input() deal: Deal;

  constructor(
      private dealService: DealService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showDeal();
  }

  showDeal() {
    const id = +this.route.snapshot.paramMap.get('id');

    const seq = this.dealService.showDeal(id);


    seq.subscribe((deal: any) => {this.deal = deal.data },
        err => console.warn('Something went wrong with showDeal() ' + err)
        );
  }

}
