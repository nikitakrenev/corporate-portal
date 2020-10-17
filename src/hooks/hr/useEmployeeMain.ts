import { IEmployeeMain } from "entities/employee";
import { useCallback, useEffect, useState } from "react";
import { HrAPI } from "../../api";

export const useEmployeeMain = (employeeId: number) => {
    const [employeeMain, setEmployeeMain] = useState<IEmployeeMain>();

    const fetch = useCallback(() => {
        return HrAPI.getEmployeeMain(employeeId).then(setEmployeeMain);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return employeeMain;
};
