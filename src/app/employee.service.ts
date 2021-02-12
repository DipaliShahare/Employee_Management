import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Employee } from "./employee.model";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  employee = new BehaviorSubject<Employee>(null);
  employees: Employee[] = [];
  empChanged = new Subject<Employee[]>();

  constructor( private http: HttpClient){}

  addEmployee(employee: Employee){
    this.employees.push(employee);
    this.empChanged.next(this.employees.slice());
    console.log(this.employees);
  }

  fetchEmployees() {
    this.http.get<Employee[]>('https://jsonplaceholder.typicode.com/users').subscribe((employees) => {
      this.employees = employees;
      this.empChanged.next(this.employees);
    })
  }

  deleteEmployee(id){
    this.employees = this.employees.filter(p => p.id !== id);
    this.empChanged.next(this.employees);
  }

  getEmployee(id){
    let employee = this.employees.find(emp => {
      emp.id == id;
    });
    this.employee.next(employee);
  }
     //return this.employees.slice();
  // fetchEmployee(index: number) {
  //   return this.employees[index];
  // }
  // getEmployees() {
  //   return this.employees
  // }
}
