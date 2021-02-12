import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  empForm: FormGroup;
  //employees: Employee[];
  currentEmployee: Employee;
  constructor( private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.empService.employee.subscribe(emp =>{
      this.currentEmployee = emp;
    })
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.empForm = new FormGroup({
      name: new FormControl( null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      username: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email,Validators.pattern(nonWhitespaceRegExp)]}),
      street: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      suite: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      city: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      zipcode: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      website: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      companyName: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      catchPhrase: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      bs: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]})
    })

    if(this.currentEmployee){
      this.patchEmployee();
    }
  }

  patchEmployee() {
    this.empForm.patchValue({
      name: this.currentEmployee.name,
      username: this.currentEmployee.username,
      email: this.currentEmployee.email,
      address: this.currentEmployee.address.city,
      phone: this.currentEmployee.phone,
      website: this.currentEmployee.website,
      company: this.currentEmployee.company.name

    })
  }

  onAddEmp() {
    let newEmployee: Employee = {
      id: this.empService.employees.length + 1,
      name: this.empForm.value.name,
      username: this.empForm.value.username,
      email: this.empForm.value.email,
      address: {
        street: this.empForm.value.street,
        suite: this.empForm.value.suite,
        city: this.empForm.value.city,
        zipcode: this.empForm.value.zipcode,
        geo: 'xyz'
      },
      phone: this.empForm.value.phone,
      website: this.empForm.value.website,
      company: {
        name: this.empForm.value.companyName,
        catchPhrase: this.empForm.value.catchPhrase,
        bs: this.empForm.value.bs
      }
    }
    this.empService.addEmployee(newEmployee);
    console.log(newEmployee);
    this.router.navigate(['list']);
  }
}
