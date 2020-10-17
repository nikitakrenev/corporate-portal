import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { TButtonType } from "../../entities";

interface Props {
    title: string;
    icon?: ReactNode;
    buttonType?: TButtonType;

    handler?(): void;

    goBack?(): void;
}

const useStyles = makeStyles(() => ({
    header: {
        height: 80,
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        borderBottom: "1px solid #CECED1",
        justifyContent: "space-between",
        flexShrink: 0,
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
    },
    headerRight: {
        display: "flex",
        alignItems: "center",
    },
    arrow: {
        display: "inline-flex",
        "&:hover": {
            cursor: "pointer",
        },
    },
    title: {
        fontSize: 18,
        lineHeight: "40px",
        fontFamily: "Roboto, sans-serif",
    },
    button: {
        background: "#0061F3",
        width: 40,
        minWidth: 40,
        height: 40,
        boxSizing: "border-box",
        color: "#fff",
        marginLeft: "auto",
        padding: "0",
        "&:hover": {
            background: "#0061F3",
        },
    },
    buttonLabel: {
        width: 40,
    },
    saveButton: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        background: "#0061F3",
        width: 152,
        minWidth: 152,
        height: 40,
        boxSizing: "border-box",
        color: "#fff",
        marginLeft: "auto",
        padding: "0",
        "&:hover": {
            background: "#0061F3",
        },
    },
    buttonText: {
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#FFFFFF",
        textTransform: "none",
    },
}));

export const PageHeader: React.FC<Props> = (props) => {
    const styles = useStyles();
    const { title, handler, icon, goBack, buttonType } = props;

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                {icon && (
                    <div className={styles.arrow} onClick={goBack}>
                        {icon}
                    </div>
                )}
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.headerRight}>
                {buttonType && buttonType === "save" && (
                    <Button
                        classes={{ root: styles.saveButton, label: styles.buttonText }}
                        onClick={handler}
                    >
                        <span>Сохранить</span>
                    </Button>
                )}
                {buttonType && buttonType === "add" && (
                    <Button
                        classes={{ root: styles.button, label: styles.buttonLabel }}
                        onClick={handler}
                    >
                        <Add />
                    </Button>
                )}
                {props.children}
            </div>
        </div>
    );
};
