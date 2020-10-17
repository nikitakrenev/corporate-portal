import { IUpdateEmployee } from "entities/employee";

export interface IEmployeeEditPage {
    employeeId: number;
    employee?: IUpdateEmployee;

    goBack?(): void;

    onSave?(data: Partial<IUpdateEmployee>): void;
}
