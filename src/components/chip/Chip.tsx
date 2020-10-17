import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";

interface Props {
    title: string;

    onDelete?(): void;
}

const useStyles = makeStyles(() => ({
    chip: {
        margin: "0 12px 12px 0",
        background: "#F0F6FF",
        borderRadius: 4,
        height: 32,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "14px",
        fontFamily: "Roboto, sans-serif",
        color: "#1D1F32",
        padding: "0 12px",
    },
    close: {
        color: "#828496",
        width: 15,
        height: 15,
        marginLeft: "auto",
        paddingLeft: 5,
        cursor: "pointer",
    },
}));

export const Chip = (props: Props) => {
    const { title, onDelete } = props;
    const styles = useStyles();

    return (
        <div className={styles.chip}>
            {title}
            {onDelete && <Clear className={styles.close} onClick={onDelete} />}
        </div>
    );
};
