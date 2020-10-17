import { IDictionary, IId } from "./common";

export interface IProjectTableRow extends IId {
    name: string;
    description: string;
    startDate: string;
    customer: string;
    budget: number;
}

export interface ICreateProject {
    name: string;
}

export interface IProject extends IId {
    budget: number;
    budgetCurrency: IDictionary;
    customerReview: string;
    department: string;
    description: string;
    details: string;
    endDate: string;
    id: number;
    imageUrl: string;
    issueTrackingSystem: IDictionary;
    language: IDictionary;
    modules: string;
    name: string;
    ourDecision: string;
    platform: string;
    problem: string;
    projectStage: IDictionary;
    projectTeamId: number;
    projectType: IDictionary;
    reviewedBy: string;
    solution: string;
    startDate: string;
    technologyStack: string;
    thumbnailUrls: string;
    totalWorkingTime: number;
    customer: string;
}

export interface IProjectEditValues {
    ru?: {
        status: string;
        privacy: string;
        field: string;
        name: string;
        description: string;
        client: string;
        budget: string;
        startDate: Date;
        endDate: Date;
        done: string;
        problem: string;
        solution: string;
        modules: string[];
        author: string;
        authorData: string;
        review: string;
        stack: string;
        details: string[];
    };
    eng?: {
        status: string;
        privacy: string;
        field: string;
        name: string;
        description: string;
        client: string;
        budget: string;
        startDate: Date;
        endDate: Date;
        done: string;
        problem: string;
        solution: string;
        modules: string[];
        author: string;
        authorData: string;
        review: string;
        stack: string;
        details: string[];
    };
}
