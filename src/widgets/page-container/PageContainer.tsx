import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
    },
}));

export const PageContainer: FC = (props) => {
    const classes = useStyles();

    return <div className={classes.root}>{props.children}</div>;
};
