import { Component, OnInit, Input } from '@angular/core';
import { AdminService, Employee } from '../../admin.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee;

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

  toggleDisabled(checkbox: HTMLBaseElement) {
    const elm = checkbox.getAttribute('id');
    const id = elm.substring(7);
    let savebtn = document.getElementById('btn-edit-' + id);

    savebtn.toggleAttribute('hidden');
    savebtn.classList.toggle('button');
  }

}
