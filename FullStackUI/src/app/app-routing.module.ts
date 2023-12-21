import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-employee',
    pathMatch: 'full',
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent,
  },
  {
    path:'employee-list',
    component:EmployeeListComponent
  },
  {
    path:'add-employee/:id',
    component:AddEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
