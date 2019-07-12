import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(
    private es: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  updateEmployee(emp, id: number) {
    const sub = this.es.updateEmployee(emp, id);
    sub.subscribe(
      (ex: any) => { emp = ex.data }
    );
  }

}
