import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Back } from "../employee-edit/components/back";
import { PageHeader } from "../../components/page-header";
import { Content } from "../employee-edit/components/content";
import { PageContent } from "../employee-edit/components/container";
import { EditWrapper } from "../../components/edit-wrapper";
import { AppContext } from "../../context";
import { useParams } from "react-router";
import { CustomForm, FormFields } from "../../components";
import { IProjectEditValues } from "../../entities";
import { Modules } from "./components/modules/Modules";
import { Detail } from "./components/detail";
import { PageContainer } from "../page-container";

const useStyles = makeStyles({
    field: {
        width: 480,
    },
});

export const ProjectEdit = (props: IProjectEditValues) => {
    const [lang, setLang] = useState<"ru" | "eng">("ru");
    const { projectId } = useParams<{ projectId: string }>();
    const styles = useStyles();

    return (
        <CustomForm
            data={{ ru: { details: [] } }}
            render={(form) => (
                <PageContainer>
                    <PageHeader
                        title={"Редактирование проекта"}
                        buttonType={"save"}
                        handler={form?.handleSubmit}
                        goBack={() => AppContext.getHistory().push(`/projects/${projectId}`)}
                        icon={<Back />}
                    />
                    <PageContent>
                        <EditWrapper tab={lang} onSwitchTab={setLang}>
                            <Content>
                                <FormFields.Select
                                    name={`${lang}.status`}
                                    label={"Статус проекта"}
                                    options={[
                                        {
                                            value: 1,
                                            label: "В разработке",
                                        },
                                    ]}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.Select
                                    name={`${lang}.privacy`}
                                    label={"Приватность"}
                                    options={[
                                        {
                                            value: 1,
                                            label: "Проект под NDA",
                                        },
                                    ]}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.Select
                                    name={`${lang}.field`}
                                    label={"Отрасль проекта"}
                                    options={[
                                        {
                                            value: 1,
                                            label: "Образование",
                                        },
                                    ]}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    name={`${lang}.name`}
                                    label={"Название проекта"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    textarea={true}
                                    name={`${lang}.description`}
                                    label={"Краткое описание"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.Select
                                    name={`${lang}.client`}
                                    label={"Клиент"}
                                    options={[
                                        {
                                            value: 1,
                                            label: "CompTIA Inc.",
                                        },
                                    ]}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    name={`${lang}.budget`}
                                    label={"Бюджет (в рублях)"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.DateField
                                    label={"Дата начала проекта"}
                                    name={`${lang}.startDate`}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.DateField
                                    label={"Дата завершения проекта"}
                                    name={`${lang}.endDate`}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.Select
                                    name={`${lang}.done`}
                                    label={"Что сделано нами"}
                                    options={[
                                        {
                                            value: 1,
                                            label: "Дизайн и разработка",
                                        },
                                    ]}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    textarea={true}
                                    name={`${lang}.problem`}
                                    label={"Проблема клиента"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    textarea={true}
                                    name={`${lang}.solution`}
                                    label={"Решение для клиента"}
                                    classes={{ root: styles.field }}
                                />
                                <Modules name={`${lang}.modules`} />
                                <FormFields.TextField
                                    name={`${lang}.author`}
                                    label={"Автор отзыва"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    name={`${lang}.authorData`}
                                    label={"Данные автора отзыва"}
                                    classes={{ root: styles.field }}
                                />
                                <FormFields.TextField
                                    textarea={true}
                                    name={`${lang}.review`}
                                    label={"Отзыв"}
                                    classes={{ root: styles.field }}
                                />
                                <Detail name={`${lang}.details`} />
                                <FormFields.TextField
                                    textarea={true}
                                    name={`${lang}.stack`}
                                    label={"Стек технологий"}
                                    classes={{ root: styles.field }}
                                />
                            </Content>
                        </EditWrapper>
                    </PageContent>
                </PageContainer>
            )}
        />
    );
};
