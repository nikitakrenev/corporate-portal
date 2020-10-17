import { Fab } from "@material-ui/core";
import { ProjectGallery } from "pages/project-detail/ProjectGallery";
import { ProjectTeam } from "./ProjectTeam";
import { useState } from "react";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ProjectInfo } from "./ProjectInfo";
import { PageContent } from "widgets/employee-edit/components/container";
import { AppContext } from "context";
import { Back } from "widgets/employee-edit/components/back";
import { PageHeader } from "components/page-header";
import { PageContainer } from "widgets/page-container";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import { useProject } from "../../hooks/projects/useProject";

const useStyles = makeStyles(() => ({
    tabHeader: {
        display: "flex",
        margin: -12,
        marginBottom: 50,
    },
    tabHeaderItem: {
        margin: 12,
        cursor: "pointer",
        color: "#CECED1",
        fontSize: 14,
    },
    tabHeaderItemActive: {
        color: "#1D1F32",
    },
    headerLinks: {
        display: "flex",
        alignItems: "center",
        margin: "0 -7px",
    },
    headerLinkItem: {
        margin: "0 7px",
        padding: 0,
        background: "none",
        color: "#828496",
        width: "2em",
        height: "2em",
        minHeight: 0,
        boxShadow: "none",
        fontSize: 16,
    },
    headerLanguage: {
        margin: "0 7px",
        padding: 10,
        color: "#7187A6",
        fontSize: 18,
    },
    headerLinkItemIcon: {
        fontSize: "inherit",
    },
}));
const tabs = ["О проекте", "Команда", "Галерея"];

export const ProjectDetail = () => {
    const [activeTab, setActiveTab] = useState(0);
    const styles = useStyles();
    const { projectId } = useParams<{ projectId: string }>();
    const { project } = useProject(projectId);

    return (
        <PageContainer>
            <PageHeader
                title={project?.name}
                icon={<Back />}
                goBack={() => AppContext.getHistory().push("/projects")}
            >
                <div className={styles.headerLinks}>
                    <div className={styles.headerLanguage}>Eng</div>
                    <Fab className={styles.headerLinkItem}>
                        <EditIcon
                            className={styles.headerLinkItemIcon}
                            onClick={() =>
                                AppContext.getHistory().push(`/projects/${projectId}/edit`)
                            }
                        />
                    </Fab>
                    <Fab className={styles.headerLinkItem}>
                        <ShareIcon className={styles.headerLinkItemIcon} />
                    </Fab>
                </div>
            </PageHeader>
            <PageContent>
                <div className={styles.tabHeader}>
                    {tabs.map((tabItem, tabItemIndex) => (
                        <div
                            key={tabItemIndex}
                            className={classnames(styles.tabHeaderItem, {
                                [styles.tabHeaderItemActive]: tabItemIndex === activeTab,
                            })}
                            onClick={() => setActiveTab(tabItemIndex)}
                        >
                            {tabItem}
                        </div>
                    ))}
                </div>
                <div>
                    {activeTab === 0 && <ProjectInfo project={project} />}
                    {activeTab === 1 && <ProjectTeam projectId={projectId} />}
                    {activeTab === 2 && <ProjectGallery projectId={projectId} />}
                </div>
            </PageContent>
        </PageContainer>
    );
};
