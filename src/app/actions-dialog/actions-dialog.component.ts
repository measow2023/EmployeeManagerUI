import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, map, tap } from 'rxjs';
import { ActionType } from '../action-type';
import { EmployeeService } from '../core/services/employee.service';
import { ActionsDialogData } from '../actions-dialog-data';
@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions-dialog.component.html',
  styleUrls: ['./actions-dialog.component.css']
})
export class ActionsDialogComponent {

  private readonly employeeService: EmployeeService;
  actionType: ActionType;
  actionValue!: number;
  errorMessage: string = "";

  constructor(
    public dialogRef: MatDialogRef<ActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionsDialogData,
  ) {
    this.employeeService = data.employeeService;
    this.actionType = data.actionType;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(data: ActionsDialogData): void {
    switch (this.actionType) {
      case ActionType.WORKED_DAYS:
        this.assignWorkedDays(data.employeeId, this.actionValue);
        break;
      case ActionType.VACATION_DAYS_USED:
        this.assignVacationDaysUsed(data.employeeId, this.actionValue);
        break;
      default:
        throw Error("Invalid Action Type.");
    }
  }

  private assignWorkedDays(employeeId: string, workedDays: number): void {
    this.employeeService.assignWorkedDays(employeeId, workedDays)
    .subscribe(
      res => this.dialogRef.close(),
      err => this.errorMessage = err.error,
      () => console.log('Request completed')
    );
  };

  private assignVacationDaysUsed(employeeId: string, vacationDaysUsed: number): void {
    this.employeeService.assignVacationDaysUsed(employeeId, vacationDaysUsed)
    .subscribe(
      res => this.dialogRef.close(),
      err => this.errorMessage = err.error,
      () => console.log('Request completed')
    );
  }
}
