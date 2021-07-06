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
  tableHeaders:Array<any> = [
    {
      label:"Nama", name:"name"
    },
    {
      label:"Tanggal Lahir", name:"birthDate"
    },
    {
      label:"Jabatan", name:"position.name"
    },
    {
      label:"NIP", name:"idNumber"
    },
    {
      label:'Jenis Kelamin', name:'gender'
    }
  ];
  orderBy:string = "id";
  orderType:string = "asc";
  constructor(private employeeService:EmployeeService, private router:Router) { }
  employees:Employee[] = [];
  ngOnInit(): void {
    this.loadItems();
  }
  loadItems():void {
    this.employeeService.getEmployeeList(this.orderBy, this.orderType)
    .subscribe((pageList:PageList)=>{
      this.employees = pageList.content;
    })
  }
  sortBy(key:string) :void {
    if (this.orderBy != key) {
      this.orderBy = key;
      this.orderType = "asc";
      this.loadItems();
      return;
    }
    this.orderType = this.orderType == "asc"?"desc":"asc";
    this.loadItems();
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
