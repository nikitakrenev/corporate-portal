import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IEmployeeTableRow } from "../../entities";

interface Props {
    employees: IEmployeeTableRow[];
}

const IMAGE = require("./image.png");

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
    },
    photo: {
        width: "100%",
        border: "1px solid #CECED1",
        borderRadius: "4px",
        marginBottom: 15,
    },
    name: {
        fontFamily: "Roboto, sans-serif",
        fontSize: 14,
        lineHeight: "18px",
        marginBottom: 6,
        color: "#1D1F32",
    },
    position: {
        fontFamily: "Roboto, sans-serif",
        fontSize: 12,
        lineHeight: "16px",
        color: "#4A4C5B",
    },
});

export const Employee = (props: Props) => {
    const { employees } = props;
    const styles = useStyles();

    return (
        <Grid container spacing={3}>
            {employees.map((item, index) => (
                <Grid item key={index} xs={2} spacing={3}>
                    <Link to={`/staff/${item.id}`} className={styles.link}>
                        <img className={styles.photo} src={IMAGE} alt="Фото сотрудника" />
                        <p className={styles.name}>{`${item.firstName} ${item.lastName}`}</p>
                        <p className={styles.position}>{item.position.title}</p>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};
