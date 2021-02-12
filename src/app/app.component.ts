import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee-Management-Tool';
  constructor( private empService: EmployeeService) {}

  ngOnInit(){
    // this.empService.fetchEmployees().subscribe((data: Employee[]) => {
    //   this.empService.employees = data;
    //   console.log(this.empService.employees)
    // })
    this.empService.fetchEmployees();
  }
}
