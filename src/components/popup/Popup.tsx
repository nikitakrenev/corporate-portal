import React, { FC } from "react";
import { Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

export interface IPopupProps {
    title: string;
    open: boolean;

    onClose?(): void;
}

const useClasses = makeStyles({
    popup: {
        minWidth: 600,
    },
    header: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "16px 10px 0 24px",
    },
    title: {
        width: 400,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    close: {
        marginLeft: "auto",
    },
});

export const Popup: FC<IPopupProps> = (props) => {
    const { open, title, onClose, children } = props;
    const styles = useClasses();

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: styles.popup }}>
            <DialogTitle className={styles.header} disableTypography>
                <Typography variant={"h6"} className={styles.title}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} className={styles.close}>
                    <Close />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    );
};
