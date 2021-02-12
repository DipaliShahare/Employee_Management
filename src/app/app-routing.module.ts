import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  //{path: '', component: AppComponent },
  {path: 'edit', component: EditEmployeeComponent},
  {path: 'list', component: EmployeeListComponent},
  {path: 'view', component: DisplayEmployeeComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
