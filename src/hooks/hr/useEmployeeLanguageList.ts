import { IEmployeeLang } from "entities/employee";
import { useCallback, useEffect, useState } from "react";
import { HrAPI } from "../../api";

export const useEmployeeLanguageList = (employeeId: number) => {
    const [list, setList] = useState<IEmployeeLang[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.getEmployeeLanguageList(employeeId).then(setList);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const add = (education: IEmployeeLang) => {
        setList([...list, education]);
    };

    const remove = (employeeId: number) => {
        setList(list.filter((item) => item.id !== employeeId));
    };

    return {
        employeeLanguageList: list,
        addLanguageToList: add,
        removeLanguageFromList: remove,
    };
};
