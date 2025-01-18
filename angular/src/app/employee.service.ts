import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) {}
  api="http://localhost:9090"

  public saveEmployee(employee:Employee): Observable<any> {
    return this.httpClient.post(`${this.api}/saveEmployee`, employee);
  }

  public getEmployees():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.api}/getEmployees`);
  }

  public deleteEmploye(id:any):Observable<any> {
    return this.httpClient.delete(`${this.api}/deleteEmployee/${id}`);
  }

  public updateEmployee(id:any,employee:Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.api}/updateEmployee/${id}`, employee);
  }

  public getEmployeeId(id:any):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.api}/getEmployee/${id}`);
  }


}
