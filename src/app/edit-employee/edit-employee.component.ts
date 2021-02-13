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
  currentEmployee: Employee;
  editing: boolean = false;
  constructor( private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.empService.employee.subscribe(emp =>{
      this.currentEmployee = emp;
    })
    this.empService.editMode.subscribe(edit => this.editing = edit);
    this.initForm();

    if(this.editing){
      this.patchEmployee();
    }
  }

  patchEmployee() {
    this.empForm.patchValue({
      name: this.currentEmployee.name,
      username: this.currentEmployee.username,
      email: this.currentEmployee.email,
      address: {
        street: this.currentEmployee.address.street,
        suite: this.currentEmployee.address.suite,
        city: this.currentEmployee.address.city,
        zipcode: this.currentEmployee.address.zipcode
      },
      phone: this.currentEmployee.phone,
      website: this.currentEmployee.website,
      company: {
        name: this.currentEmployee.company.name,
        catchPhrase: this.currentEmployee.company.catchPhrase,
        bs: this.currentEmployee.company.bs
      }
    })
  }

  onSubmit() {
    let newId
    if(this.editing){
      newId = this.currentEmployee.id;
    }
    else {
      newId = this.empService.employees.length + 1;
    }
    let newEmployee: Employee = {
      id: newId,
      name: this.empForm.value.name,
      username: this.empForm.value.username,
      email: this.empForm.value.email,
      address: {
        street: this.empForm.value.address.street,
        suite: this.empForm.value.address.suite,
        city: this.empForm.value.address.city,
        zipcode: this.empForm.value.address.zipcode,
        geo: 'xyz'
      },
      phone: this.empForm.value.phone,
      website: this.empForm.value.website,
      company: {
        name: this.empForm.value.company.name,
        catchPhrase: this.empForm.value.company.catchPhrase,
        bs: this.empForm.value.company.bs
      }
    }
    if(this.editing){
      this.empService.updateEmployee(this.currentEmployee.id, newEmployee);
      this.editing = false;
      this.empForm.reset();
      this.router.navigate(['list']);
    }
    else {
      this.empService.addEmployee(newEmployee);
      console.log(newEmployee);
      this.empForm.reset();
      this.router.navigate(['list']);
    }

  }

  initForm(){
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.empForm = new FormGroup({
      name: new FormControl( null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      username: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email,Validators.pattern(nonWhitespaceRegExp)]}),

      address: new FormGroup({
        street: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
        suite: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
        city: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
        zipcode: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      }),
      phone: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
      website: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),

      company: new FormGroup ({
        name: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
        catchPhrase: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]}),
        bs: new FormControl(null, {validators: [Validators.required, Validators.pattern(nonWhitespaceRegExp)]})
      })
    })
  }
}
