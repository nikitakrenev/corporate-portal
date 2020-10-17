import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IEmployeeProject } from "../../entities";

interface Props {
    project: IEmployeeProject;
}

const useStyles = makeStyles({
    employeeProject: {
        marginBottom: "28px",
    },
    employeeProjectTitle: {
        display: "flex",
        alignItems: "baseline",
    },
    employeeProjectYear: {
        marginRight: "16px",
        fontSize: "16px",
        lineHeight: "27px",
        fontFamily: "Roboto, sans-serif",
        color: "#828496",
    },
    employeeProjectName: {
        fontSize: "20px",
        lineHeight: "24px",
        fontFamily: "Roboto, sans-serif",
        textDecoration: "none",
        color: "#0061F3",
    },
    employeeProjectInfo: {
        marginLeft: "52px",
    },
    employeeProjectPosition: {
        marginTop: "9px",
        fontSize: "16px",
        lineHeight: "20px",
        fontFamily: "Roboto, sans-serif",
        color: "#1D1F32",
    },
    employeeProjectDescription: {
        marginTop: "9px",
        fontSize: "14px",
        lineHeight: "18px",
        fontFamily: "Roboto, sans-serif",
        color: "#4A4C5B",
        opacity: "0.8",
    },
    employeeProjectTechnologies: {
        marginTop: "9px",
        fontSize: "14px",
        lineHeight: "18px",
        fontFamily: "Roboto, sans-serif",
        color: "#414549",
    },
});

export const EmployeeProject = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.employeeProject}>
            <div className={classes.employeeProjectTitle}>
                <span className={classes.employeeProjectYear}>{props.project.year}</span>
                <Link className={classes.employeeProjectName} to="#">
                    {props.project.name}
                </Link>
            </div>
            <div className={classes.employeeProjectInfo}>
                <p className={classes.employeeProjectPosition}>{props.project.position}</p>
                <p className={classes.employeeProjectDescription}>{props.project.description}</p>
                <p className={classes.employeeProjectTechnologies}>
                    Технологии: {props.project.technologies}
                </p>
            </div>
        </div>
    );
};
