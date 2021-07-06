import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../employee.service';
import { Position } from './../models/position';
import { Employee } from './../models/employee';
import { ActivatedRoute, ParamMap, Route, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {
  state : Observable<object>|undefined;
  title:string = "Edit Data Karyawan";
  positions:Position[] = [];
  employee:Employee = new Employee();
  employeeId:number|undefined;
  constructor(public activatedRoute: ActivatedRoute, private router:Router, private employeeService: EmployeeService) { 
    this.employeeId = (this.router.getCurrentNavigation()?.extras?.state?.employeeId); // should log out 'bar'
    console.debug("EMP id: ", this.employeeId);
  }

  ngOnInit(): void {
    this.employeeService.addEdit(this.employeeId).
    subscribe((employeeDTO)=>{
      this.positions = employeeDTO.positionList;
      if (employeeDTO.employee) {
        this.employee = employeeDTO.employee;
      }
    });
   
  }
  submit(): void {
    if (this.employeeId && this.employee.id && this.employee.id > 0){
      this.employeeService.update(this.employee)
      .subscribe((employee:Employee)=>{
        this.router.navigateByUrl("/index");
      });
      return;
    }
    this.employeeService.insert(this.employee)
    .subscribe((employee:Employee)=>{
      this.router.navigateByUrl("/index");
    });
  }
  updatePosition(position:Position) {
    this.employee.position = position;
  }

}
