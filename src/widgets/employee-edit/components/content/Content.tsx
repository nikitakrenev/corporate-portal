import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    content: {
        display: "grid",
        gridAutoColumns: "1fr",
        gridRowGap: 40,
    },
}));

export const Content: FC = (props) => {
    const styles = useStyles();

    return <div className={styles.content}>{props.children}</div>;
};
