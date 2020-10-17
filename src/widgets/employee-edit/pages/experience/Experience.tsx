import React, { useState } from "react";
import { EditWrapper } from "components/edit-wrapper";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import { Back } from "../../components/back";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { Content } from "../../components/content";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { IUpdateEmployee } from "entities";

const useStyles = makeStyles({
    field: {
        width: 200,
    },
});

export const Experience = (props: IEmployeeEditPage) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const innerClasses = useStyles();

    return (
        <CustomForm<IUpdateEmployee>
            data={props.employee}
            onSubmit={props.onSave}
            render={(form) => (
                <div>
                    <PageHeader
                        title={"Профиль сотрудника"}
                        handler={form?.handleSubmit}
                        buttonType={"save"}
                        goBack={props.goBack}
                        icon={<Back />}
                    />
                    <PageContent>
                        <Title>Опыт работы</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <Content>
                                <FormFields.TextField
                                    name={"experience"}
                                    label={"Опыт работы"}
                                    classes={{ root: innerClasses.field }}
                                />
                            </Content>
                        </EditWrapper>
                    </PageContent>
                </div>
            )}
        />
    );
};
