import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {
  private readonly GET_EMPLOYEES_URL: string = 'http://localhost:5000/employees';

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.GET_EMPLOYEES_URL);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.GET_EMPLOYEES_URL + '/' + id);
  }

  assignWorkedDays(id: string, days: number): Observable<Employee> {
    let url: string = this.GET_EMPLOYEES_URL + '/' + id + '/work';
    return this.http.post<Employee>(url, { "workedDays": days});
  }

  assignVacationDaysUsed(id: string, days: number): Observable<Employee> {
    let url: string = this.GET_EMPLOYEES_URL + '/' + id + '/take-vacation';
    return this.http.post<Employee>(url, { "vacationDaysUsed": days});
  }
}
