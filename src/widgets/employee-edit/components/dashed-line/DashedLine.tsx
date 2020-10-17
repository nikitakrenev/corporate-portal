import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import cn from "classnames";

interface Props {
    className?: string;

    onClick?(): void;
}

const useStyles = makeStyles({
    wrapper: {
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        width: 1,
        height: "10%",
        borderRight: "1px dashed #CECED1",
    },
    button: {
        width: 15,
        height: 15,
        color: "#0061F3",
        cursor: "pointer",
    },
    bottom: {
        width: 1,
        height: "calc(90% - 15px)",
        borderRight: "1px dashed #CECED1",
    },
});

export const DashedLine = (props: Props) => {
    const { className, onClick } = props;
    const styles = useStyles();

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.top} />
            <Clear className={styles.button} onClick={onClick} />
            <div className={styles.bottom} />
        </div>
    );
};
