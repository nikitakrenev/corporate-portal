import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        color: "#fff",
    },
}));

export const Notifications: React.FC = () => {
    const styles = useStyles();

    return <div className={styles.root}>11</div>;
};
