import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList;
  subscription: Subscription;
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeList = res;
    });
  }

  deleteEmployee(id: string) {
    let employeeId = {
      id: id,
    };

    this.subscription = this.employeeService
      .deleteEmplyee(employeeId)
      .subscribe(() => {
        this.employeeService.getEmployeeList().subscribe();
      });
  }
}
