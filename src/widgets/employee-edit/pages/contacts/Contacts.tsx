import React, { useState } from "react";
import { EditWrapper } from "components/edit-wrapper";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { Content } from "../../components/content";
import { Back } from "../../components/back";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { IUpdateEmployee } from "entities/employee";

const useStyles = makeStyles({
    field: {
        width: 480,
    },
});

const validationSchema = Yup.object().shape({
    phone: Yup.string().required(),
    email: Yup.string().required().email(),
});

export const Contacts = (props: IEmployeeEditPage) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const innerClasses = useStyles();

    return (
        <CustomForm<IUpdateEmployee>
            validationSchema={validationSchema}
            data={props.employee}
            onSubmit={props.onSave}
            render={(form) => (
                <>
                    <PageHeader
                        title={"Профиль сотрудника"}
                        handler={form?.handleSubmit}
                        buttonType={"save"}
                        goBack={props.goBack}
                        icon={<Back />}
                    />
                    <PageContent>
                        <Title>Контакты</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <Content>
                                <FormFields.TextField
                                    name={"phone"}
                                    label={"Телефон"}
                                    type={"phone"}
                                    classes={{ root: innerClasses.field }}
                                />
                                <FormFields.TextField
                                    name={"email"}
                                    label={"Рабочий email"}
                                    type={"email"}
                                    classes={{ root: innerClasses.field }}
                                />
                            </Content>
                        </EditWrapper>
                    </PageContent>
                </>
            )}
        />
    );
};
