import { IEmployeeEducation } from "entities/employee";
import { useCallback, useEffect, useState } from "react";
import { HrAPI } from "../../api";

export const useEmployeeEducationList = (employeeId: number) => {
    const [list, setList] = useState<IEmployeeEducation[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.getEducationList(employeeId).then(setList);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const add = (education: IEmployeeEducation) => {
        setList([...list, education]);
    };

    const remove = (employeeId: number) => {
        setList(list.filter((item) => item.id !== employeeId));
    };

    return {
        educationList: list,
        addEducationToList: add,
        removeEducationFromList: remove,
    };
};
