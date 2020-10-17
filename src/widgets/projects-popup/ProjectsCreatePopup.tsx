import React from "react";
import { IPopupProps, Popup } from "../../components/popup";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { FormFields } from "../../components";
import { ProjectAPI } from "api";
import { ICreateProject } from "entities/project";
import { projectPopupInitialValues } from "./projectPopupInitialValues";

interface Props extends IPopupProps {
    onSuccess(): void;
}

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(3),
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginRight: 10,
    },
}));

export const ProjectsCreatePopup = (props: Props) => {
    const { onClose, onSuccess, open, title } = props;
    const styles = useStyles();

    const submitHandler = (values: ICreateProject) => {
        ProjectAPI.createProject(values).then(onSuccess);
    };

    return (
        <Popup title={title} open={open} onClose={onClose}>
            <Formik
                initialValues={projectPopupInitialValues}
                onSubmit={submitHandler}
                render={(form) => (
                    <Form className={styles.content}>
                        <FormFields.TextField
                            name={"name"}
                            label={"Название проекта"}
                            classes={{ root: styles.field }}
                        />
                        <div className={styles.actions}>
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                color={"primary"}
                                className={styles.button}
                            >
                                ОТМЕНА
                            </Button>
                            <Button variant="contained" color={"primary"} type="submit">
                                ОК
                            </Button>
                        </div>
                    </Form>
                )}
            />
        </Popup>
    );
};
