export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeType: string;
  vacationDaysAccumulated: number;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    employeeType: string,
    vacationDaysAccumulated: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.employeeType = employeeType;
    this.vacationDaysAccumulated = vacationDaysAccumulated;
  }
}
