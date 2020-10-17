import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles({
    row: {
        color: "#0061F3",
        marginRight: "32px",
    },
});

export const Back = () => {
    const styles = useStyles();

    return <ArrowBack classes={{ root: styles.row }} />;
};
