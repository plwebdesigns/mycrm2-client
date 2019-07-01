import { Component, OnInit } from '@angular/core';
import { AdminService, Employee } from '../../admin.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee

  constructor(
    private es: AdminService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    const sub = this.es.getEmployees();
    sub.subscribe(
      (emp: any) => { this.employees = emp.data }
    );
  }

}
