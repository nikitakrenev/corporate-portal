import { IOption } from "components/form-fields/select";
import { IDictionary } from "entities";
import { useCallback, useEffect, useState, useMemo } from "react";
import { HrAPI } from "../../api";

export function useLeaderList() {
    const [leaderList, setLeaderList] = useState<IDictionary[]>([]);

    const fetch = useCallback(() => {
        return HrAPI.getLeaderList().then(setLeaderList);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const leaderOptions = useMemo<IOption[]>(
        () => leaderList.map((item) => ({ label: item.title || "[Без названия]", value: item.id })),
        [leaderList],
    );

    return { leaderList, leaderOptions };
}
