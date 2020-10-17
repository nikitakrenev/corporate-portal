import { IFetchEmployeeListParams } from "api/params/IFetchEmployeeListParams";
import { IDictionary } from "entities/common";
import {
    ICreateEmployee,
    IEmployee,
    IEmployeeTableRow,
    IEmployeeEducation,
    IUpdateEmployee,
    IEmployeeLang,
    IEmployeeMain,
    IEmployeePosition,
} from "entities/employee";
import { dateService } from "services/dateService";
import { transport } from "services/transport";

export function fetchEmployeeList(params?: IFetchEmployeeListParams): Promise<IEmployeeTableRow[]> {
    return transport.get<IEmployeeTableRow[]>("/api/hr/v1.1/hr/employee", params);
}

export function fetchEmployee(id: string): Promise<IEmployee> {
    return transport.get<IEmployee>(`api/hr/v1.1/hr/employee/${id}`);
}

export function createEmployee(employee: ICreateEmployee): Promise<number> {
    return transport.post(`api/hr/v1.1/hr/employee`, {
        ...employee,
        birthday: dateService.toSeverFormat(employee.birthday),
    });
}

export function updateEmployee(employee: Partial<IUpdateEmployee>): Promise<number> {
    const postData = { ...employee };
    if (postData.birthday) {
        postData.birthday = dateService.toSeverFormat(postData.birthday);
    }
    return transport.put(`api/hr/v1.1/hr/employee`, postData);
}

export function deleteEmployee(employeeID: number): Promise<number> {
    return transport.delete(`api/hr/v1.1/hr/employee/${employeeID}`);
}

export function getDepartmentList(): Promise<IDictionary[]> {
    return transport.get(`api/hr/v1.1/hr/department`);
}

export function getPositionList(): Promise<IDictionary[]> {
    return transport.get(`api/hr/v1.1/hr/position`);
}

export function updateEducation(
    employeeId: number,
    educationsList: IEmployeeEducation[],
): Promise<IEmployeeEducation[]> {
    return transport.put(`api/hr/v1.1/hr/employee/${employeeId}/educationlist`, educationsList);
}

export function getEducationList(employeeId: number): Promise<IEmployeeEducation[]> {
    return transport.get(`api/hr/v1.1/hr/employee/${employeeId}/education`);
}

export function createEducation(employeeId: number): Promise<IEmployeeEducation> {
    return transport.post(`api/hr/v1.1/hr/employee/${employeeId}/education`, {});
}

export function deleteEducation(employeeId: number, educationId: number): Promise<void> {
    return transport.delete(`api/hr/v1.1/hr/employee/${employeeId}/education/${educationId}`, {});
}

export function getEmployeeLanguageList(employeeId: number): Promise<IEmployeeLang[]> {
    return transport.get(`api/hr/v1.1/hr/employee/${employeeId}/languages`);
}

export function createEmployeeLanguage(employeeId: number): Promise<IEmployeeLang> {
    return transport.post(`api/hr/v1.1/hr/employee/${employeeId}/languages`, {});
}

export function updateEmployeeLanguages(
    employeeId: number,
    languages: IEmployeeLang[],
): Promise<IEmployeeLang> {
    return transport.put(`api/hr/v1.1/hr/employee/${employeeId}/languagelist`, languages);
}

export function deleteEmployeeLanguage(
    employeeId: number,
    languageId: number,
): Promise<IEmployeeLang> {
    return transport.delete(`api/hr/v1.1/hr/employee/${employeeId}/languages/${languageId}`);
}

export function getEmployeeMain(employeeId: number): Promise<IEmployeeMain> {
    return transport.get(`api/hr/v1.1/hr/employee/${employeeId}/main`);
}

export function updateEmployeeMain(
    employeeId: number,
    payload: IEmployeeMain,
): Promise<IEmployeeMain> {
    return transport.put(`api/hr/v1.1/hr/employee/${employeeId}/main`, {
        ...payload,
        birthday: dateService.toSeverFormat(payload.birthday),
    });
}

export function getEmployeePosition(employeeId: number): Promise<IEmployeePosition> {
    return transport.get(`api/hr/v1.1/hr/employee/${employeeId}/position`);
}

export function updateEmployeePosition(
    employeeId: number,
    payload: IEmployeePosition,
): Promise<IEmployeePosition> {
    return transport.put(`api/hr/v1.1/hr/employee/${employeeId}/position`, payload);
}

export function getLeaderList(): Promise<IDictionary[]> {
    return transport.get(`api/hr/v1.1/hr/leaders`);
}
