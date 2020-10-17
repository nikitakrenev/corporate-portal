import {
    compact,
    filter,
    findIndex,
    forIn,
    get,
    groupBy,
    isNil,
    map,
    sortBy,
    uniqBy,
} from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    IEmployeeTableRow,
    IId,
    IProjectTeam,
    IProjectTeamDetails,
    IProjectTeamEmployee,
    IProject,
} from "../../entities";
// import { ProjectAPI } from "../../api";
import * as ProjectAPI from "./fakeProjectApi";
import { useEmployeeList } from "../hr";
import { useProjectsList } from "../projects";
import { getWeekTitle, getWeeksTitles, getStartAndEndOfWeek } from "./utils";

interface IProjectTeamItem extends IProjectTeamDetails, ISelection {
    period?: string;
}

interface IWeekPlanningItem {
    id?: number;
    budgeted: number;
    planned: number;
    actual: number;
    startDate: string;
    endDate: string;
    period: string;
}

interface ISelection {
    projectId?: number;
    employeeId?: number;
}

const MAX_WEEK_HOURS = 40;

const getFilterCondition = (selection: ISelection) => {
    const { projectId, employeeId } = selection;
    let condition = {};
    if (!isNil(projectId)) {
        condition = { ...condition, projectId };
    }
    if (!isNil(employeeId)) {
        condition = { ...condition, employeeId };
    }
    return condition;
};

const formatEmployeeInfo = (employee: IProjectTeamEmployee | IEmployeeTableRow) => ({
    id: employee.id,
    name: `${employee?.firstName || ""} ${employee.lastName || ""} ${employee.middleName || ""}`,
    position: employee.position?.title,
});

const formatProjectInfo = (project: IProject) => ({
    id: project.id,
    name: project.name,
});

export function usePlanning() {
    const weekTitles = getWeeksTitles();
    const { employees } = useEmployeeList();
    const { projects } = useProjectsList();
    const [projectTeams, setProjectTeams] = useState<IProjectTeamItem[]>([]);
    const [selection, setSelection] = useState<ISelection>({});
    const [selectedPeriod, setPeriod] = useState<string | undefined>(
        getWeekTitle(new Date().valueOf()),
    );

    // autoselect first project on load
    useEffect(() => {
        if (projects.length && !selection.projectId) {
            setSelection({
                ...selection,
                projectId: projects[0].id,
            });
        }
    }, [selection.projectId, projects.length]);

    const fetchList = useCallback(async () => {
        return ProjectAPI.fetchProjectTeamList({}).then((items) => {
            setProjectTeams(
                items.map((item) => ({
                    ...item,
                    projectId: item.project?.id,
                    employeeId: item.employee?.id,
                    period: !isNil(item.startDate) ? getWeekTitle(item.startDate) : undefined,
                })),
            );
        });
    }, [setProjectTeams]);

    const createProjectTeam = useCallback(
        async (data: Partial<IProjectTeamItem>) => {
            if (isNil(data.projectId) || isNil(data.employeeId)) {
                return;
            }
            const params = {
                ...data,
                project: data.projectId,
                employee: data.employeeId,
            };
            ProjectAPI.createProjectTeam(params).then(() => fetchList());
        },
        [fetchList],
    );

    const updateProjectTeam = useCallback(
        async (data: IId & Partial<IProjectTeam>) => {
            const list = projectTeams;
            const index = findIndex(list, { id: data.id });
            if (!(index >= 0) || !list[index]) {
                return;
            }
            const item = list[index];
            const params: IProjectTeam = {
                ...item,
                ...data,
                project: item.projectId,
                employee: item.employeeId,
            };
            return ProjectAPI.updateProjectTeam(params).then((updatedData) => {
                const { project, employee, ...rest } = updatedData;
                list[index] = { ...item, ...rest };
                setProjectTeams([...list]);
            });
        },
        [projectTeams, setProjectTeams],
    );

    const editPlanningItem = useCallback(
        (params: IId & Partial<IWeekPlanningItem>) => {
            return !isNil(params.id) ? updateProjectTeam(params) : createProjectTeam(params);
        },
        [createProjectTeam, updateProjectTeam],
    );

    const removeEmployeeFromProject = useCallback(
        (employeeId: number) => {
            if (isNil(selection.projectId)) {
                return;
            }
            const params = {
                employee: employeeId,
                project: selection.projectId,
            };
            ProjectAPI.removeProjectTeams(params).then(() => fetchList());
        },
        [fetchList, selection, projectTeams, setProjectTeams],
    );

    const addEmployeeToProjectTeam = useCallback(
        (employeeId: number) => {
            if (isNil(selection.projectId)) {
                return;
            }
            const params = {
                project: selection.projectId,
                employee: employeeId,
            };
            ProjectAPI.createProjectTeam(params).then(() => fetchList());
        },
        [fetchList, selection, setProjectTeams, projectTeams],
    );

    const selectedProjectTeams = useMemo(() => {
        return filter<IProjectTeamItem>(projectTeams, getFilterCondition(selection));
    }, [projectTeams, selection]);

    const employeeList = useMemo(() => {
        return employees.map(formatEmployeeInfo);
    }, [employees]);

    const projectList = useMemo(() => {
        return projects.map(formatProjectInfo);
    }, [projects]);

    const projectEmployees = useMemo(() => {
        return compact(uniqBy(map(selectedProjectTeams, "employee"), "id")).map(formatEmployeeInfo);
    }, [selectedProjectTeams]);

    const employeeProjects = useMemo(() => {
        return compact(uniqBy(map(selectedProjectTeams, "project"), "id")).map(formatProjectInfo);
    }, [selectedProjectTeams]);

    const projectPlanning: IWeekPlanningItem[][] = useMemo(() => {
        const projectId = selection.projectId;
        if (isNil(projectId)) {
            return [];
        }
        return projectEmployees.map((employee) => {
            const employeeId = employee.id;
            let findingIndex = 0;
            const list = sortBy(filter(selectedProjectTeams, { employeeId }), "period");
            return weekTitles.map((period, index) => {
                const { startDate, endDate } = getStartAndEndOfWeek(index + 1);
                findingIndex = findIndex(list.slice(findingIndex), { period });
                const { id, budgeted = 0, planned = 0, actual = 0 } = { ...list[findingIndex] };
                return {
                    id,
                    period,
                    startDate,
                    endDate,
                    budgeted,
                    planned,
                    actual,
                    projectId,
                    employeeId,
                };
            });
        });
    }, [projectEmployees, selectedProjectTeams, selection]);

    const resourcePlanning: IWeekPlanningItem[][] = useMemo(() => {
        const employeeId = selection.employeeId;
        if (isNil(employeeId)) {
            return [];
        }
        return employeeProjects.map((project) => {
            const projectId = project.id;
            let findingIndex = 0;
            const list = sortBy(filter(selectedProjectTeams, { projectId: project.id }), "period");
            return weekTitles.map((period, index) => {
                const { startDate, endDate } = getStartAndEndOfWeek(index + 1);
                findingIndex = findIndex(list.slice(findingIndex), { period });
                const { id, budgeted = 0, planned = 0, actual = 0 } = { ...list[findingIndex] };
                return {
                    id,
                    period,
                    startDate,
                    endDate,
                    budgeted,
                    planned,
                    actual,
                    projectId,
                    employeeId,
                };
            });
        });
    }, [employeeProjects, selectedProjectTeams, selection]);

    const employeeProjectsByPeriodMap = useMemo(() => {
        const byPeriodMap = {};
        forIn(groupBy(projectTeams, "period"), (items, period) => {
            if (period) {
                byPeriodMap[period] = groupBy(items, "employeeId");
            }
        });
        return byPeriodMap;
    }, [projectTeams]);

    const employeesWithProjectInfo = useCallback(
        (list: Array<{ id: number; name: string; position: string }>) => {
            if (!selectedPeriod) {
                return list.map((employee) => ({ ...employee, time: 0, projectHours: [] }));
            }
            return list.map((employee) => {
                let freeHours = MAX_WEEK_HOURS;
                const projectHours = compact(
                    get(employeeProjectsByPeriodMap[selectedPeriod], employee.id, []).map(
                        (item: IProjectTeamItem) => {
                            const { project, planned: hours = 0 } = item;
                            if (hours && project) {
                                freeHours -= hours;
                                return { title: project.name, hours };
                            }
                        },
                    ),
                );
                return { ...employee, time: freeHours, projectHours };
            });
        },
        [selectedPeriod, employeeProjectsByPeriodMap],
    );

    const projectEmployeesInfo = useMemo(() => {
        return employeesWithProjectInfo(projectEmployees);
    }, [projectEmployees, employeeProjectsByPeriodMap, selectedPeriod]);

    const employeesInfo = useMemo(() => {
        return employeesWithProjectInfo(employeeList);
    }, [employeeList, employeeProjectsByPeriodMap, selectedPeriod]);

    const selectPeriod = useCallback(
        (period: string) => {
            if (period !== selectedPeriod) {
                setPeriod(period);
            }
        },
        [selectedPeriod, setPeriod],
    );

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    useEffect(() => {
        ProjectAPI.setup(projects, employees);
    }, [employees, projects]); // TODO: remove later

    return {
        weekTitles,
        employeeList,
        projectList,
        projectPlanning,
        resourcePlanning,
        employeesInfo,
        projectEmployeesInfo,
        employeeProjects,
        selection,
        setSelection,
        selectPeriod,
        addEmployeeToProjectTeam,
        editPlanningItem,
        removeEmployeeFromProject,
    };
}
