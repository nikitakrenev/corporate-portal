import React, { FC } from "react";
import { IPopupProps, Popup } from "../popup";
import { Button, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IConfirmPopupProps extends IPopupProps {
    submitTitle?: string;
    cancelTitle?: string;
    description?: string;

    onSubmit?(): void;
}

const useStyles = makeStyles({
    button: {
        marginRight: 10,
    },
    actions: {
        padding: "16px 24px",
    },
});

export const ConfirmPopup: FC<IConfirmPopupProps> = (props) => {
    const {
        onClose,
        open,
        title,
        onSubmit,
        cancelTitle = "Отмена",
        submitTitle = "Ок",
        description,
    } = props;
    const styles = useStyles();

    return (
        <Popup open={open} title={title} onClose={onClose}>
            {description && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions className={styles.actions}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    color={"primary"}
                    className={styles.button}
                >
                    {cancelTitle}
                </Button>
                <Button variant="contained" color={"primary"} onClick={onSubmit}>
                    {submitTitle}
                </Button>
            </DialogActions>
        </Popup>
    );
};
