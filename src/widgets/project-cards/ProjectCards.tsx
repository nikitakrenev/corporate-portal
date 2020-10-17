import { Grid } from "@material-ui/core";
import { IProjectTableRow } from "entities";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const projectPlaceholder = require("./img/image.png");

interface IProjectCardsProps {
    projects: IProjectTableRow[];
}
const useStyles = makeStyles(() => ({
    projectCard: {
        border: "1px solid #D9DDE3",
        borderRadius: 6,
        overflow: "hidden",
    },
    projectLogo: {
        backgroundColor: "#0088fe",
        position: "relative",
        paddingBottom: "40%",
    },
    projectLogoImage: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    projectBody: {
        padding: 24,
        color: "#0F1011",
        fontSize: 14,
    },
    projectTitle: {
        fontSize: 24,
        marginBottom: 16,
    },
    projectInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    budget: {
        color: "#7187A6",
        textAlign: "right",
    },
    projectDescription: {
        color: "#999999",
        marginTop: 16,
    },
}));

export const ProjectCards: React.FC<IProjectCardsProps> = ({ projects }) => {
    const styles = useStyles();

    return (
        <Grid container spacing={3}>
            {projects.map((project) => (
                <Grid item key={project.id} xs={3} spacing={3}>
                    <div className={styles.projectCard}>
                        <div className={styles.projectLogo}>
                            <img
                                className={styles.projectLogoImage}
                                src={projectPlaceholder}
                                alt=""
                            />
                        </div>
                        <div className={styles.projectBody}>
                            <div className={styles.projectTitle}>{project.name}</div>
                            <div className={styles.projectInfo}>
                                <div>{moment(project.startDate).format("YYYY")}</div>
                                <div className={styles.budget}>{project.budget}</div>
                            </div>
                            {project.description && (
                                <div className={styles.projectDescription}>
                                    {project.description}
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};
