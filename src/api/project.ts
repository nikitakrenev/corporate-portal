import { IFetchProjectListParams } from "api/params/IFetchProjectListParams";
import { transport } from "services/transport";
import {
    ICreateProject,
    IListParams,
    IProject,
    IProjectTableRow,
    IProjectTeam,
    IProjectTeamDetails,
} from "entities";

export function fetchProjectsList(params?: IFetchProjectListParams): Promise<IProjectTableRow[]> {
    return transport.get<IProjectTableRow[]>("/api/project/v1.0/project/project", params);
}

export function fetchProject(id: string): Promise<IProject> {
    return transport.get<IProject>(`api/project/v1.0/project/project/${id}`);
}

export function deleteProject(projectId: number): Promise<number> {
    return transport.delete(`api/project/v1.0/project/project/${projectId}`);
}

export function createProject(project: ICreateProject): Promise<number> {
    return transport.post("/api/project/v1.0/project/project", project);
}

export async function fetchProjectTeamList(
    params: IListParams = {},
): Promise<IProjectTeamDetails[]> {
    return transport.get("/api/project/v1.0/project/projectTeam", params);
}

export async function createProjectTeam(params: Omit<IProjectTeam, "id">): Promise<IProjectTeam> {
    return transport.post("/api/project/v1.0/project/projectTeam", params);
}

export async function updateProjectTeam(params: IProjectTeam): Promise<IProjectTeam> {
    return transport.put("/api/project/v1.0/project/projectTeam", params);
}
