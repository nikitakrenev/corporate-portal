import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    skill: string;
    className?: string;
}

const useStyles = makeStyles({
    employeeSkill: {
        margin: "0 12px 12px 0",
        padding: "8px 12px",
        background: "#F0F6FF",
        borderRadius: "4px",
    },
    employeeSkillName: {
        fontSize: "14px",
        lineHeight: "14px",
        fontFamily: "Roboto, sans-serif",
        color: "#1D1F32",
    },
});

export const EmployeeSkill = (props: Props) => {
    const { skill } = props;
    const classes = useStyles();

    return (
        <div className={classes.employeeSkill}>
            <span className={classes.employeeSkillName}>{skill}</span>
        </div>
    );
};
