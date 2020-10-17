import { find, findIndex, isNil, remove } from "lodash";
import { IListParams, IProjectTeam, IProjectTeamDetails } from "../../entities";

let projects = [];
let employees = [];
let projectTeams: IProjectTeamDetails[] = JSON.parse(localStorage.getItem("projectTeams")) || [];
export const setup = (projectList, employeesList) => {
    projects = projectList;
    employees = employeesList;
};

const setProjectTeams = (list: any[]) => {
    projectTeams = list;
    localStorage.setItem("projectTeams", JSON.stringify(list));
};

export async function fetchProjectTeamList(
    params: IListParams = {},
): Promise<IProjectTeamDetails[]> {
    return projectTeams;
}

export async function createProjectTeam(params: Omit<IProjectTeam, "id">): Promise<IProjectTeam> {
    const { project, employee, ...rest } = params;
    const projectDoc = find(projects, { id: project });
    const employeeDoc = find(employees, { id: employee });
    const list = [...projectTeams];
    const index = findIndex<IProjectTeamDetails>(
        list,
        (item) => item.project?.id === project && item.employee?.id === employee,
    );
    const existsFirst = projectTeams[index];
    if (index >= 0 && existsFirst && isNil(existsFirst.startDate)) {
        const updated = {
            ...existsFirst,
            ...rest,
            project: projectDoc,
            employee: employeeDoc,
            id: existsFirst.id,
        };
        list[index] = updated;
        setProjectTeams([...list]);
        return updated;
    }
    const created = {
        ...params,
        id: new Date().valueOf(),
        project: projectDoc,
        employee: employeeDoc,
    };
    setProjectTeams([...list, created]);
    return created;
}

export async function updateProjectTeam(params: IProjectTeam): Promise<IProjectTeam> {
    const { id, project, employee, ...rest } = params;
    const list = [...projectTeams];
    const index = findIndex<IProjectTeamDetails>(list, { id });
    const updated = { ...list[index], ...rest };
    list[index] = updated;
    setProjectTeams([...list]);
    return { ...updated, project, employee };
}

export async function removeProjectTeams(params: {
    employee: number;
    project: number;
}): Promise<void> {
    const list = [...projectTeams];
    remove(
        list,
        (item) => item.employee.id === params.employee && item.project.id === params.project,
    );
    setProjectTeams(list);
}
