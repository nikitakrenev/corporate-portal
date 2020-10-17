import { IFetchEmployeeListParams } from "api/params/IFetchEmployeeListParams";
import { IEmployeeTableRow } from "entities";
import { useCallback, useEffect, useState } from "react";
import { HrAPI } from "../../api";

export function useEmployeeList(params?: IFetchEmployeeListParams) {
    const [employees, setEmployees] = useState<IEmployeeTableRow[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.fetchEmployeeList(params).then((response) => setEmployees(response));
    }, [params]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { employees, fetchEmployees: fetch };
}
