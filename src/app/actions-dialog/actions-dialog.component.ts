import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActionType } from '../action-type';
import { ActionsDialogData } from '../actions-dialog-data';
@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions-dialog.component.html',
  styleUrls: ['./actions-dialog.component.css']
})
export class ActionsDialogComponent {
  days: number = 0;
  @Input() errorMessage!: string;
  @Input() data!: ActionsDialogData;
  @Output() onWorkedDaysSave: EventEmitter<any> = new EventEmitter();
  @Output() onVacationDaysUsedSave: EventEmitter<any> = new EventEmitter();
  @Output() onModalCancel: EventEmitter<any> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ActionsDialogComponent>) { }

  onSubmit(actionValue: number): void {
    switch (this.data.actionType) {
      case ActionType.WORKED_DAYS:
        this.assignWorkedDays(this.data.employeeId, actionValue);
        break;
      case ActionType.VACATION_DAYS_USED:
        this.assignVacationDaysUsed(this.data.employeeId, actionValue);
        break;
      default:
        throw Error("Invalid Action Type.");
    }
  }

  onCancel(): void {
    this.onModalCancel.emit();
  }

  private assignWorkedDays(employeeId: string, workedDays: number): void {
    this.onWorkedDaysSave.emit({ employeeId, workedDays });
  };

  private assignVacationDaysUsed(employeeId: string, vacationDaysUsed: number): void {
    this.onVacationDaysUsedSave.emit({ employeeId, vacationDaysUsed });
  }
}
