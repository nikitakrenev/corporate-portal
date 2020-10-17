import { IOption } from "components/form-fields/select";
import { IDictionary } from "entities";
import { useCallback, useEffect, useState, useMemo } from "react";
import { HrAPI } from "../../api";

export function usePositionList() {
    const [positionList, setPositionList] = useState<IDictionary[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.getPositionList().then(setPositionList);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const positionOptions = useMemo<IOption[]>(
        () =>
            positionList.map((item) => ({ label: item.title || "[Без названия]", value: item.id })),
        [positionList],
    );

    return { positionList, positionOptions };
}
