import { IDictionary, IId } from "./common";
import { IProjectTableRow } from "./project";

export interface IProjectTeam extends IId {
    project: number;
    employee: number;
    startDate?: string;
    endDate?: string;
    budgeted?: number;
    planned?: number;
    actual?: number;
}

export interface IProjectTeamEmployee extends IId {
    email: string;
    phone: string;
    position: IDictionary;
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
}

export interface IProjectTeamDetails extends Omit<IProjectTeam, "project" | "employee"> {
    employee: IProjectTeamEmployee;
    project: IProjectTableRow;
}
