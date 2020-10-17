import { IOption } from "components/form-fields/select";
import { IDictionary } from "entities";
import { useCallback, useEffect, useState, useMemo } from "react";
import { HrAPI } from "../../api";

export function useDepartmentList() {
    const [departments, setDepartments] = useState<IDictionary[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.getDepartmentList().then(setDepartments);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const departmentOptions = useMemo<IOption[]>(
        () => departments.map((dep) => ({ label: dep.title, value: dep.id })),
        [departments],
    );

    return { departments, departmentOptions };
}
