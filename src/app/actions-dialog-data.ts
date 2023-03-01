import { ActionType } from "./action-type";

export interface ActionsDialogData {
  employeeId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeVacationDaysAccumulated: number;
  actionType: ActionType;
}
