import {Component, Input, OnInit} from '@angular/core';
import {Deal, DealService} from "../../deal.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {

  @Input() deal: Deal;

  constructor(
      private dealService: DealService,
      private route: ActivatedRoute,
      private location: Location
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
  
  updateDeal(deal) {
    const id = +this.route.snapshot.paramMap.get('id');
    const seq = this.dealService.updateDeal(id, deal);
    
    seq.subscribe((dx: any) => {deal = dx},
      err => console.warn('Something went wrong with updateDeal() ' + err),
      () => this.toggleModal()
    );
  }
  toggleModal() {
    document.getElementById('modal-success').classList.toggle('is-active');
  }

  goBack(): void {
    this.location.back();
  }

}
