import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from './models/page-list';
import { Employee } from './models/employee';
import { EmployeeDTO } from './models/employee-dto';
const host = 'http://localhost:8080/employeedata/employee/';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeList():Observable<PageList>{
    return this.http.post<PageList>(host+'index', {});
  }
  insert(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'insert', employee);
  }
  update(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'update', employee);
  }
  delete(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'delete', employee);
  }
  addEdit(employeeId?:number ):Observable<EmployeeDTO>{
    const url = employeeId?(host+'addEdit/'+employeeId):(host+'addEdit');
    return this.http.get<EmployeeDTO>(url);
  }
}
