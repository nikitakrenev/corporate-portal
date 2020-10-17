import React, { FC } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    title: string;
    className?: string;
    route?: string;
}

const useStyles = makeStyles({
    employeeEdit: {
        display: "block",
        margin: "8px 0 0 0",
        textDecoration: "none",
        fontFamily: "Roboto, sans-serif",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#0061F3",
    },
    employeeSection: {
        marginTop: "44px",
    },
    employeeSectionTitle: {
        display: "flex",
        alignItems: "baseline",
    },
    employeeSectionName: {
        margin: "0 12px 18px 0",
        fontSize: "20px",
        lineHeight: "24px",
        fontStyle: "normal",
        fontWeight: 600,
        fontFamily: "Roboto, sans-serif",
        color: "#828496",
    },
});

export const TitleWrapper: FC<Props> = (props) => {
    const { title, children, route = "" } = props;
    const classes = useStyles();

    return (
        <div className={classes.employeeSection}>
            <div className={classes.employeeSectionTitle}>
                <div className={classes.employeeSectionName}>{title}</div>
                <Link to={route} className={classes.employeeEdit}>
                    Редактировать
                </Link>
            </div>
            <div>{children}</div>
        </div>
    );
};
