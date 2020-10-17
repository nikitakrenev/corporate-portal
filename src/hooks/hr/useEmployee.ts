import { IEmployee, IUpdateEmployee } from "entities/employee";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HrAPI } from "api/index";
import {
    courses,
    education,
    events,
    lang,
    personalSkills,
    projects,
    publications,
    skills,
} from "./data";

const defaultEmployee: IEmployee = {
    id: 0,
    birthday: new Date(1970, 0, 1).toISOString(),
    email: "email@email.com",
    firstName: "John",
    lastName: "Johnson",
    middleName: "James",
    personalQualities: personalSkills,
    phone: "123456789",
    age: "31 год",
    phoneCode: "11",
    photoUrl: "url",
    sex: {
        id: 1,
        title: "male",
    },
    education,
    events,
    publications,
    courses,
    projects,
    grade: {
        id: 1,
        title: "Middle",
    },
    languages: lang,
    leader: {
        id: 1,
        title: "Алексей Васильев",
    },
    department: {
        id: 1,
        title: "Web",
    },
    position: {
        id: 1,
        title: "web developer",
    },
    rank: {
        id: 1,
        title: "Senior",
    },
    skills,
    experience: "5 лет",
};

export function useEmployee(
    id?: string,
): {
    employee: IEmployee | undefined;
    employeeForUpdate: IUpdateEmployee | undefined;
} {
    const [employee, setEmployee] = useState<IEmployee | undefined>(undefined);

    const fetch = useCallback(() => {
        return HrAPI.fetchEmployee(id)
            .then((data) => setEmployee(data))
            .catch(() => {
                setEmployee(defaultEmployee);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, []);

    const employeeForUpdate = useMemo<IUpdateEmployee>(() => {
        return !employee
            ? undefined
            : {
                  ...employee,
                  department: employee.department.id,
                  password: "",
                  status: "",
                  position: employee.position.id,
                  leader: employee.leader.id,
                  grade: employee.leader.id,
                  sex: employee.sex.id,
              };
    }, [employee]);

    return { employee, employeeForUpdate };
}
