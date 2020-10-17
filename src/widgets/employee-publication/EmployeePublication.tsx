import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IEmployeeCoursePub } from "../../entities";

interface Props {
    publication: IEmployeeCoursePub;
}

const useStyles = makeStyles({
    employeeCourse: {
        marginBottom: "28px",
    },
    employeeCourseTitle: {
        display: "flex",
        alignItems: "baseline",
    },
    employeeCourseYear: {
        marginRight: "16px",
        fontSize: "16px",
        lineHeight: "27px",
        fontFamily: "Roboto, sans-serif",
        color: "#828496",
    },
    employeeCourseName: {
        fontSize: "20px",
        lineHeight: "24px",
        fontFamily: "Roboto, sans-serif",
        textDecoration: "none",
        color: "#1D1F32",
    },
    employeeCourseInfo: {
        marginTop: "9px",
        marginLeft: "52px",
        ontSize: "16px",
        lineHeight: "20px",
        fontFamily: "Roboto, sans-serif",
        color: "#0061F3",
    },
});

export const EmployeePublication = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.employeeCourse}>
            <div className={classes.employeeCourseTitle}>
                <span className={classes.employeeCourseYear}>{props.publication.year}</span>
                <span className={classes.employeeCourseName}>{props.publication.name}</span>
            </div>
            <p className={classes.employeeCourseInfo}>{props.publication.description}</p>
        </div>
    );
};
