import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from './../models/employee';
import { PageList } from './../models/page-list';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  constructor(private employeeService:EmployeeService, private router:Router) { }
  employees:Employee[] = [];
  ngOnInit(): void {
    this.loadItems();
  }
  loadItems():void {
    this.employeeService.getEmployeeList()
    .subscribe((pageList:PageList)=>{
      this.employees = pageList.content;
    })
  }

  deleteRecord(employee:Employee):void {
    this.employeeService.delete(employee)
    .subscribe((employee:Employee)=>{
      this.loadItems();
    });
  }
  showUpdateForm(employee:Employee):void {
    this.router.navigate(['addEdit'], { state: { employeeId: employee.id} });
    // this.router.navigateByUrl('/addEdit', { state: { employee:  employee } });
  }

}
