import { HrAPI } from "api";
import { useNotifications } from "hooks/app";
import { useEmployeeMain } from "hooks/hr/useEmployeeMain";
import React, { useState } from "react";
import { EditWrapper } from "components/edit-wrapper";
import { employeeService } from "services/employeeService";
import { birthdayValidation, maxBirthdayDate, minBirthdayDate } from "utils/birthdayValidation";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Title } from "../../components/title";
import { PageContent } from "../../components/container";
import { Content } from "../../components/content";
import { Back } from "../../components/back";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { IEmployeeMain } from "entities/employee";

const IMAGE = require("../../../employee-card/image.png");

const useStyles = makeStyles({
    employeeImage: {
        marginTop: "4px 0 38px 0",
        width: "189px",
        height: "189px",
        borderRadius: "4px",
    },
    field: {
        width: 480,
        margin: 0,
    },
});

const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(),
    firstName: Yup.string().required(),
    middleName: Yup.string().required(),
    birthday: birthdayValidation,
});

export const MainInfo: React.FC<IEmployeeEditPage> = ({ goBack, employeeId }) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const innerClasses = useStyles();
    const employeeMain = useEmployeeMain(employeeId);
    const { notifySuccess } = useNotifications();

    const submit = (values: IEmployeeMain) => {
        HrAPI.updateEmployeeMain(employeeId, values).then(() => notifySuccess("Saved successful"));
    };

    const getNameWithTranslation = (name: string) => {
        return tab === "ru" ? name : `translation.${name}`;
    };

    if (!employeeMain) {
        return null;
    }
    return (
        <CustomForm<IEmployeeMain>
            validationSchema={validationSchema}
            data={employeeMain}
            onSubmit={submit}
            render={(form) => (
                <>
                    <PageHeader
                        title={"Профиль сотрудника"}
                        handler={form?.submitForm}
                        buttonType={"save"}
                        goBack={goBack}
                        icon={<Back />}
                    />
                    <PageContent>
                        <Title>Данные профиля</Title>
                        <img className={innerClasses.employeeImage} src={IMAGE} alt="Photo" />
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <Content>
                                <FormFields.TextField
                                    name={getNameWithTranslation("lastName")}
                                    label={"Фамилия"}
                                    classes={{ root: innerClasses.field }}
                                />
                                <FormFields.TextField
                                    name={getNameWithTranslation("firstName")}
                                    label={"Имя"}
                                    classes={{ root: innerClasses.field }}
                                />
                                <FormFields.TextField
                                    name={getNameWithTranslation("middleName")}
                                    label={"Отчество"}
                                    classes={{ root: innerClasses.field }}
                                />
                                <FormFields.Radio
                                    name={"sex"}
                                    label={"Пол"}
                                    options={employeeService.getSexOptions()}
                                    convertValuesToNumber={true}
                                />
                                <FormFields.DateField
                                    label={"Дата рождения"}
                                    name={"birthday"}
                                    classes={{ root: innerClasses.field }}
                                    minDate={minBirthdayDate}
                                    maxDate={maxBirthdayDate}
                                />
                            </Content>
                        </EditWrapper>
                    </PageContent>
                </>
            )}
        />
    );
};
