import { IProject } from "../../entities";
import { useCallback, useEffect, useState } from "react";
import { ProjectAPI } from "../../api";

export function useProject(id?: string): { project: IProject | undefined } {
    const [project, setProject] = useState<IProject | undefined>(undefined);

    const fetch = useCallback(() => {
        return ProjectAPI.fetchProject(id).then((response) => setProject(response));
    }, []);

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, []);

    return { project };
}
