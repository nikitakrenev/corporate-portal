import { ELanguages } from "entities/ELanguages";
import { IDictionary, IId } from "./common";

export interface IEmployeeTableRow extends IId {
    birthday: string;
    department: IDictionary;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    grade: IDictionary;
    personalQualities: string;
    phone: string;
    phoneCode: string;
    photoUrl: string;
    position: IDictionary;
    sex: IDictionary;
    status: string;
}

export interface IEmployeeLang {
    id: number;
    title: ELanguages;
    level: string;
}

export interface IEmployeeProject {
    year: string;
    name: string;
    position: string;
    description: string;
    technologies: string;
}

export interface IEmployeeCoursePub {
    year: string;
    name: string;
    description?: string;
    link?: string;
}

export interface IEmployeeEvent {
    year: string;
    name: string;
    role: IDictionary;
    theme?: string;
}

export interface IEmployeeSkills {
    experience: string;
    skills: string[];
    personalSkills: string[];
}

export interface IEmployee extends IId {
    birthday: string;
    department: IDictionary;
    lastName: string;
    middleName: string;
    phoneCode: string;
    photoUrl: string;
    firstName: string;
    age: string;
    phone: string;
    email: string;
    personalQualities: string[];
    sex: {
        id: number;
        title: string;
    };
    grade: IDictionary;
    leader: IDictionary;
    rank: IDictionary;
    education: IEmployeeEducation[];
    languages: IEmployeeLang[];
    projects: IEmployeeProject[];
    courses: IEmployeeCoursePub[];
    publications: IEmployeeCoursePub[];
    events: IEmployeeEvent[];
    position: IDictionary;
    skills: string[];
    experience: string;
}

export type TEmployeeProfileTab = "main" | "vacation";

export type TEmployeeLangTab = "ru" | "eng";

export type TEmployeesView = "list" | "bars";

export type TButtonType = "add" | "save" | "none";

export enum EEmployeeEditKey {
    MAIN = "main",
    CONTACTS = "contacts",
    POSITION = "position",
    EDUCATION = "education",
    EXPERIENCE = "experience",
    LANGUAGES = "languages",
    SKILLS = "skills",
    PROJECTS = "projects",
    COURSES = "courses",
    PUBLICATIONS = "publications",
    EVENTS = "events",
}

export enum ESex {
    MALE = 1,
    FEMALE = 2,
}

export interface ICreateEmployee {
    firstName: string;
    middleName: string;
    lastName: string;
    // дата в формате 1990-10-22
    birthday: string;
    email: string;
    sex: ESex;
}

export interface IUpdateEmployee extends ICreateEmployee {
    id: number;
    password: string;
    department: number;
    position: number;
    phoneCode: string;
    phone: string;
    leader: number;
    grade: number;
    education: IEmployee["education"];
    languages: IEmployee["languages"];
    skills: IEmployee["skills"];
    projects: IEmployee["projects"];
    events: IEmployee["events"];
    courses: IEmployee["courses"];
    publications: IEmployee["publications"];
    status: string;
}

export interface IEmployeeEducation {
    id: number;
    name: string;
    level: string;
    faculty: string;
    speciality: string;
    year: string;
    translation?: {
        name: string;
        faculty: string;
        speciality: string;
    };
}

export interface IEmployeeMain {
    id: number;
    sex: ESex;
    birthday: string;
    firstName: string;
    lastName: string;
    middleName: string;
    translation?: {
        id: number;
        firstName: string;
        lastName: string;
        middleName: string;
    };
}

export interface IEmployeePosition {
    department: number;
    grade: string;
    leader: number;
    position: number;
}

export enum EEducationLevel {
    HIGHER = "HIGHER",
    MIDDLE = "MIDDLE",
    INCOMPLETE_HIGHER = "INCOMPLETE_HIGHER",
}

export enum EEmployeeGrade {
    JUNIOR = "junior",
    JUNIOR_PLUS = "junior+",
    MIDDLE = "middle",
    MIDDLE_PLUS = "middle+",
    SENIOR = "senior",
    LEAD = "lead",
}
