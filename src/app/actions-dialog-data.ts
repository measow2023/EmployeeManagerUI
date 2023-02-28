import { ActionType } from "./action-type";
import { EmployeeService } from "./core/services/employee.service";

export interface ActionsDialogData {
  employeeId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeVacationDaysAccumulated: number;
  actionType: ActionType;
  employeeService: EmployeeService
}
