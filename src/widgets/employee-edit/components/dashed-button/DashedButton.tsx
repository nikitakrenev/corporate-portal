import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";

interface Props {
    className?: string;

    onClick?(): void;
}

const useStyles = makeStyles(() => ({
    button: {
        border: "1px dashed #828496",
        height: 42,
        fontSize: 14,
        borderRadius: 4,
        lineHeight: "16px",
        color: "#828496",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
}));

export const DashedButton: FC<Props> = (props) => {
    const { className, onClick, children } = props;
    const styles = useStyles();

    return (
        <div className={cn(styles.button, className)} onClick={onClick}>
            {children}
        </div>
    );
};
