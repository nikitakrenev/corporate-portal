import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HrAPI } from "api";
import { IPopupProps, Popup } from "components/popup";
import { ICreateEmployee } from "entities/employee";
import { Form, Formik } from "formik";
import { useDepartmentList } from "hooks/hr/useDepartmentList";
import { usePositionList } from "hooks/hr/usePositionList";
import React from "react";
import { employeeService } from "services/employeeService";
import { birthdayValidation, maxBirthdayDate, minBirthdayDate } from "utils/birthdayValidation";
import { employeePopupInitialValues } from "widgets/employee-popup/employeePopupInitialValues";
import * as Yup from "yup";
import { FormFields } from "../../components";

interface IEmployeePopupProps extends Partial<IPopupProps> {
    onSuccess(): void;
}

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginRight: 10,
    },
}));

const validationSchema = Yup.object().shape<Partial<ICreateEmployee>>({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    middleName: Yup.string().required(),
    email: Yup.string().required().email(),
    birthday: birthdayValidation,
});

export const EmployeePopup: React.FC<IEmployeePopupProps> = ({ open, onClose, onSuccess }) => {
    const styles = useStyles();
    const { departmentOptions } = useDepartmentList();
    const { positionOptions } = usePositionList();

    const submitHandler = (values: ICreateEmployee) => {
        HrAPI.createEmployee(values).then(onSuccess);
    };

    return (
        <Popup title={"Новый сотрудник"} open={open} onClose={onClose}>
            <Formik
                initialValues={employeePopupInitialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
                render={(form) => (
                    <Form className={styles.content}>
                        <FormFields.TextField
                            name={"lastName"}
                            label={"Фамилия"}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                        />
                        <FormFields.TextField
                            name={"firstName"}
                            label={"Имя"}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                        />
                        <FormFields.TextField
                            name={"middleName"}
                            label={"Отчество"}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                        />
                        <FormFields.TextField
                            name={"email"}
                            label={"E-mail"}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                        />
                        <FormFields.DateField
                            name={"birthday"}
                            label={"День рождения"}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                            maxDate={maxBirthdayDate}
                            minDate={minBirthdayDate}
                        />
                        <FormFields.Radio
                            name={"sex"}
                            label={"Пол"}
                            options={employeeService.getSexOptions()}
                            classes={{ root: styles.field }}
                            convertValuesToNumber={true}
                        />
                        <FormFields.Select
                            name={"department"}
                            label={"Отдел"}
                            options={departmentOptions}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
                        />
                        <FormFields.Select
                            name={"position"}
                            label={"Должность"}
                            options={positionOptions}
                            classes={{ root: styles.field }}
                            errorPosition={"top"}
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
