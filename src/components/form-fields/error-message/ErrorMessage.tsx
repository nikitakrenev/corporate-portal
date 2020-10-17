import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";

export interface IErrorMessageProps {
    title: string;
    position?: "right" | "top";
    className?: string;
}
const useStyles = makeStyles(() => ({
    errorWrapper: {
        display: "flex",
        marginLeft: 10,
        alignItems: "center",
        "&._position-top": {
            bottom: "calc(100% + 10px)",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "100%",
            left: "50%",
            transform: "translate(-50%, 0)",
        },
    },
    error: {
        height: 30,
        borderRadius: 4,
        background: "#E84444",
        color: "#fff",
        fontSize: 12,
        lineHeight: "16px",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
    },
    arrow: {
        width: 0,
        height: 0,
        border: "7px solid transparent",
        "$errorWrapper._position-right &": {
            borderRightColor: "#E84444",
        },
        "$errorWrapper._position-top &": {
            borderTopColor: "#E84444",
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: "translate(-50%, 0)",
        },
    },
}));
export const ErrorMessage: React.FC<IErrorMessageProps> = ({ title, position = "right" }) => {
    const styles = useStyles();

    return (
        <div
            className={classnames(styles.errorWrapper, {
                [`_position-${position}`]: position,
            })}
        >
            <div className={styles.arrow} />
            <div className={styles.error}>{title}</div>
        </div>
    );
};
