import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from './../models/employee';
import { PageList } from './../models/page-list';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  tableHeaders:Array<any> = [
    { label:"Nama", name:"name" }, { label:"Tanggal Lahir", name:"birthDate" },
    { label:"Jabatan", name:"position" }, { label:"NIP", name:"idNumber" }, { label:'Jenis Kelamin', name:'gender' }
  ];
  orderBy:string = "id";
  orderType:string = "asc";
  constructor(private employeeService:EmployeeService, private router:Router, private app:AppComponent) { }
  employees:Employee[] = [];
  ngOnInit(): void {
    this.loadItems();
  }
  loadItems():void {
    this.employeeService.getEmployeeList(this.orderBy, this.orderType)
    .subscribe((pageList:PageList)=>{
      this.employees = pageList.content;
    }, (err)=> this.handleError(err));
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
  handleError(error:any) {
    console.debug("Error: ", error);
    this.app.showInfo("Operasi gagal");
  }
  deleteRecord(employee:Employee):void {
    this.app.showConfirm("Apakah Anda akan menghapus data ini?").then((ok)=>{
      if (!ok) return;
        this.employeeService.delete(employee)
        .subscribe((response)=>this.loadItems(), (err)=> this.handleError(err));
    });
  }
  showUpdateForm(employee:Employee):void {
    this.app.showConfirm("Apakah Anda akan mengedit data ini?").then((ok)=>{
      if (ok) {
        this.router.navigate(['addEdit'], { state: { employeeId: employee.id} });
      }
    });
  }

}
