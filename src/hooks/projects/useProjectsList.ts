import { useCallback, useEffect, useState } from "react";
import { IProjectTableRow } from "entities";
import { ProjectAPI } from "../../api";

export function useProjectsList(searchString?: string) {
    const [projects, setProjects] = useState<IProjectTableRow[]>([]);

    const fetch = useCallback(() => {
        return ProjectAPI.fetchProjectsList({
            name: searchString,
        }).then((response) => setProjects(response));
    }, [searchString]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { projects, fetchProjects: fetch };
}
