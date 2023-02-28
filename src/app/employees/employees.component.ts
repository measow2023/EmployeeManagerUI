import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionType } from '../action-type';
import { Employee } from '../core/models/employee.model';
import { EmployeeService } from '../core/services/employee.service';
import { ActionsDialogComponent } from '../actions-dialog/actions-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  displayedColumns: any;
  dataSource: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadDisplayColumns();
    this.loadData();
  }

  openWorkedDaysDialog(index: number) {
    this.openActionsDialog(index, ActionType.WORKED_DAYS);
  }

  openVacationDaysUsedDialog(index: number) {
    this.openActionsDialog(index, ActionType.VACATION_DAYS_USED);
  }

  private openActionsDialog(index: number, actionType: ActionType): void {
    let employee = this.dataSource[index];
    const dialogRef = this.dialog.open(ActionsDialogComponent, {
      data: {
        actionType: actionType,
        employeeService: this.employeeService,
        employeeId: employee.id,
        employeeFirstName: employee.firstName,
        employeeLastName: employee.lastName,
        employeeVacationDaysAccumulated: employee.vacationDaysAccumulated
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  private loadData() {
    this.employeeService.getAll().subscribe(employees => {
      this.dataSource = employees;
    });
  }

  private loadDisplayColumns() {
    this.displayedColumns =
      ['id', 'firstName', 'lastName', 'employeeType', 'vacationDaysAccumulated', 'actions'];
  }
}
