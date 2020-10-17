import React, { useState } from "react";
import { ProjectCards } from "widgets/project-cards";
import { ProjectTable } from "../../widgets/project-table";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { ProjectsCreatePopup } from "../../widgets/projects-popup";
import { PageContainer } from "../../widgets/page-container";
import { ListIcon } from "./ListIcon";
import { BarIcon } from "./BarIcon";
import { PageHeader } from "../../components/page-header";
import { TTAbleViewType } from "../../entities";
import { useProjectsList } from "../../hooks/projects";
import { useNotifications } from "../../hooks/app";
import { ProjectAPI } from "api";

const useStyles = makeStyles(() => ({
    content: {
        padding: 40,
    },
    toolbar: {
        display: "flex",
        marginBottom: 40,
    },
    toolbarRight: {
        marginLeft: "auto",
        display: "flex",
    },
    searchField: {
        width: 280,
        height: 40,
        marginRight: 20,
    },
    input: {
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16,
    },
    icon: {
        cursor: "pointer",
        marginRight: 10,
        borderRadius: 4,
        "&:last-child": {
            marginRight: 0,
        },
    },
}));

export const Projects = () => {
    const styles = useStyles();
    const [create, setCreate] = useState(false);
    const [view, setView] = useState<TTAbleViewType>("list");
    const [searchString, setSearchString] = useState("");
    const { projects, fetchProjects } = useProjectsList(searchString);
    const { notifySuccess } = useNotifications();

    const createProject = () => {
        setCreate(false);
        fetchProjects();
        notifySuccess("Project created");
    };

    const deleteProject = (id: number) => {
        ProjectAPI.deleteProject(id).then(() => {
            fetchProjects();
            notifySuccess(`Project ${id} deleted`);
        });
    };

    return (
        <PageContainer>
            <PageHeader
                title={"Проекты компании"}
                handler={() => setCreate(true)}
                buttonType={"add"}
            />
            <div className={styles.content}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarRight}>
                        <TextField
                            variant={"outlined"}
                            placeholder={"Поиск..."}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color={"disabled"} />
                                    </InputAdornment>
                                ),
                                classes: {
                                    root: styles.input,
                                },
                            }}
                            classes={{ root: styles.searchField }}
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <div className={styles.icon}>
                            <ListIcon active={view === "list"} onClick={() => setView("list")} />
                        </div>
                        <div className={styles.icon}>
                            <BarIcon active={view === "bars"} onClick={() => setView("bars")} />
                        </div>
                    </div>
                </div>
                {view === "list" && <ProjectTable body={projects} onDelete={deleteProject} />}
                {view === "bars" && <ProjectCards projects={projects} />}
                {create && (
                    <ProjectsCreatePopup
                        open={create}
                        title={"Новый"}
                        onClose={() => setCreate(false)}
                        onSuccess={createProject}
                    />
                )}
            </div>
        </PageContainer>
    );
};
