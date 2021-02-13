import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
//import { Subscription } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company', 'edit', 'delete']
  dataSource = new MatTableDataSource<Employee>();
  //private employeeSub: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private empService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    // this.empService.fetchEmployees().subscribe((users:Employee[]) => {
    //   this.dataSource.data = users;
    //   this.empService.employees = users;
    // })
    // console.log(this.dataSource.data);
    this.empService.empChanged.subscribe( (employees) => {
      this.dataSource.data = employees;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: String){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
   // this.pastExerciseSub.unsubscribe();
  }

  onEditEmployee(id: number) {
    this.empService.getEmployee(id);
    this.empService.editMode.next(true);
    this.router.navigate(['edit']);
  }

  onDeleteEmployee(id: number) {
    this.empService.deleteEmployee(id);
  }

}
