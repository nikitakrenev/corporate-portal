import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IEmployeeEvent } from "../../entities";

interface Props {
    event: IEmployeeEvent;
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
        color: "#0061F3",
    },
    employeeCourseInfo: {
        marginTop: "9px",
        marginLeft: "52px",
        ontSize: "16px",
        lineHeight: "20px",
        fontFamily: "Roboto, sans-serif",
        color: "#4A4C5B",
    },
    employeeCourseTheme: {
        marginTop: "9px",
        marginLeft: "52px",
        fontSize: "14px",
        lineHeight: "18px",
        opacity: "0.8",
        fontFamily: "Roboto, sans-serif",
        color: "#4A4C5B",
    },
});

export const EmployeeEvent = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.employeeCourse}>
            <div className={classes.employeeCourseTitle}>
                <span className={classes.employeeCourseYear}>{props.event.year}</span>
                <span className={classes.employeeCourseName}>{props.event.name}</span>
            </div>
            <p className={classes.employeeCourseInfo}>{props.event.role.title}</p>
            <p className={classes.employeeCourseTheme}>{props.event.theme}</p>
        </div>
    );
};
