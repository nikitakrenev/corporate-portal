import { IEmployeePosition } from "entities/employee";
import { useCallback, useEffect, useState } from "react";
import { HrAPI } from "../../api";

export const useEmployeePosition = (employeeId: number) => {
    const [employeePosition, setEmployeePosition] = useState<IEmployeePosition>();

    const fetch = useCallback(() => {
        return HrAPI.getEmployeePosition(employeeId).then(setEmployeePosition);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return employeePosition;
};
