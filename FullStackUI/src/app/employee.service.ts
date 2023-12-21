import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { EmployeeModel } from './add-employee/add-employee.component';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  baseApiUrl = environment.apiUrl;

  getEmployeeList(): Observable<any> {
    console.log('url', `${this.baseApiUrl}/getAllData`);
    return this.http.get(`${this.baseApiUrl}/getAllData`);
  }

  addEmployee(employee): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(
      `${this.baseApiUrl}/addNewEmp`,
      JSON.stringify(employee),
      headers
    );
  }

  deleteEmplyee(employeeId): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(employeeId),
    };

    return this.http.delete(`${this.baseApiUrl}/deleteEmp`, options);
  }

  updateEmployee(updateEmployeeInfo) {
    console.log(JSON.stringify(updateEmployeeInfo))
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };


    return this.http.put(`${this.baseApiUrl}/updateEmp`,  JSON.stringify(updateEmployeeInfo),headers);
  }
}
