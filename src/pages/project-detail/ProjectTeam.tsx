import { Grid, List, ListItem, Menu, MenuItem } from "@material-ui/core";
import { ProjectTeamItem } from "components/project-team-item";
import { useState } from "react";
import { projectTeamData, projectTeamManagerData } from "./data/projectTeamData";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DashedButton } from "widgets/employee-edit/components/dashed-button";

interface IProjectTeamProps {
    projectId: string;
}
const useStyles = makeStyles(() => ({
    projectTeam: {
        width: 325,
    },
    projectTeamGroupTitle: {
        color: "#828496",
        fontSize: 14,
        marginBottom: 16,
    },
    projectManagerListButton: {
        margin: "-8px -16px",
        width: "auto",
        display: "block",
    },
}));

export const ProjectTeam: React.FC<IProjectTeamProps> = () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeProjectManager, setProjectManager] = useState(projectTeamManagerData);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={6} className={styles.projectTeam}>
            <Grid item xs={12}>
                <div className={styles.projectTeamGroupTitle}>Менеджер проекта</div>
                <List component="nav" aria-label="project manager">
                    <ListItem
                        onClick={handleClickListItem}
                        button
                        className={styles.projectManagerListButton}
                    >
                        <ProjectTeamItem item={activeProjectManager} showExpandedIcon={true} />
                    </ListItem>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {projectTeamData
                            .concat(projectTeamManagerData)
                            .map((projectTeamItem, projectTeamItemIndex) => (
                                <MenuItem
                                    key={projectTeamItemIndex}
                                    selected={projectTeamItem.name === activeProjectManager.name}
                                    onClick={() => {
                                        setProjectManager(projectTeamItem);
                                        handleClose();
                                    }}
                                >
                                    <ProjectTeamItem item={projectTeamItem} />
                                </MenuItem>
                            ))}
                    </Menu>
                </List>
            </Grid>
            <Grid item xs={12}>
                <div className={styles.projectTeamGroupTitle}>Работники</div>
                <Grid container spacing={3}>
                    {projectTeamData.map((projectTeamItem, projectTeamItemIndex) => (
                        <Grid item xs={12} key={projectTeamItemIndex}>
                            <ProjectTeamItem
                                item={projectTeamItem}
                                onDelete={() => console.log("delete project team item")}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <DashedButton>Добавить сотрудников</DashedButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
