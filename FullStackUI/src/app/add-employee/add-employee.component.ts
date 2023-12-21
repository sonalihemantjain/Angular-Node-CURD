import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface EmployeeModel {
  name: string;
  empCode: string;
  salary: number;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  testForm?: FormGroup;
  employeeId = 0;

  constructor(
    private emplyeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap.subscribe((paramsData) => {
      if (paramsData) {
        const id = paramsData.get('id');
        this.employeeId = +id;

        this.testForm.get('employee_code').disable();

        this.emplyeeService.getEmployeeList().subscribe((res) => {
          const updateEmployee = res.filter((x) => x.id === +id);
          if (updateEmployee.length > 0) {
            this.testForm.patchValue(updateEmployee[0]);
          }
        });
      }
    });
  }

  setForm() {
    return (this.testForm = new FormGroup({
      id: new FormControl(''),
      employee_code: new FormControl(''),
      name: new FormControl(''),
      salary: new FormControl(''),
    }));
  }

  onNumericValue(event?: any) {
    const regex = /[0-9]/g;

    if (!event.key.match(regex)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.employeeId === 0) {
      let empInfo = {
        employee_code: this.testForm.get('employee_code').value,
        name: this.testForm.get('name').value,
        salary: this.testForm.get('salary').value,
      };

      this.emplyeeService.addEmployee(empInfo).subscribe(() => {
        this.router.navigate(['/employee-list']);
      });
    } else if (this.employeeId !== 0) {
      let updateEmpInfo = {
        name: this.testForm.get('name').value,
        id: this.testForm.get('id').value,
        salary: this.testForm.get('salary').value,
      };

      this.emplyeeService.updateEmployee(updateEmpInfo).subscribe(() => {
        this.router.navigate(['/employee-list']);
      });
    }
  }
}
