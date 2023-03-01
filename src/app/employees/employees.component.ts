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
    var dialogRef = this.dialog.open(ActionsDialogComponent);

    let employee = this.dataSource[index];

    const dialogComponentInstance: ActionsDialogComponent = dialogRef.componentInstance;

    dialogComponentInstance.data = {
      actionType: actionType,
      employeeId: employee.id,
      employeeFirstName: employee.firstName,
      employeeLastName: employee.lastName,
      employeeVacationDaysAccumulated: employee.vacationDaysAccumulated
    };

    dialogComponentInstance.onModalCancel.subscribe(() => {
      dialogRef.close();
    });

    dialogComponentInstance.onWorkedDaysSave.subscribe((payload: { employeeId: string, workedDays: number }) => {
      this.employeeService.assignWorkedDays(payload.employeeId, payload.workedDays)
        .subscribe(
          res => {
            dialogRef.close()
            this.loadData();
          },
          err => dialogComponentInstance.errorMessage = err.error
        );
    });

    dialogComponentInstance.onVacationDaysUsedSave.subscribe((payload: { employeeId: string, vacationDaysUsed: number }) => {
      this.employeeService.assignVacationDaysUsed(payload.employeeId, payload.vacationDaysUsed)
        .subscribe(
          res => {
            dialogRef.close()
            this.loadData();
          },
          err => dialogComponentInstance.errorMessage = err.error
        );
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
