import React, { FC } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    title: {
        paddingBottom: 38,
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "24px",
        color: "#1D1F32",
    },
});

export const Title: FC = (props) => {
    const styles = useStyles();

    return <div className={styles.title}>{props.children}</div>;
};
