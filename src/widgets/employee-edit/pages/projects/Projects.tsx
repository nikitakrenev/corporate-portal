import React, { useState } from "react";
import { CustomForm } from "components/custom-form";
import { Back } from "../../components/back";
import { PageHeader } from "components/page-header";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { EditWrapper } from "components/edit-wrapper";
import { makeStyles } from "@material-ui/core/styles";
import { Content } from "../../components/content";
import { FormFields } from "../../../../components";
import { IUpdateEmployee } from "entities/employee";
import { FieldArray } from "formik";
import { DashedButton } from "../../components/dashed-button";
import { DashedLine } from "../../components/dashed-line";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";

const useStyles = makeStyles(() => ({
    row: {
        display: "flex",
    },
    year: {
        width: 200,
    },
    yearDescription: {
        color: "#828496",
        fontSize: 14,
        lineHeight: "16px",
        width: 270,
        marginLeft: 20,
    },
    field: {
        width: 672,
    },
    dashedLine: {
        marginLeft: 10,
    },
    add: {
        marginTop: 30,
        width: 672,
    },
}));

export const Projects = (props: IEmployeeEditPage) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const styles = useStyles();

    return (
        <CustomForm<IUpdateEmployee>
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
                        <Title>Проекты</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <FieldArray
                                name={"projects"}
                                render={(array) => (
                                    <>
                                        <Content>
                                            {form?.values &&
                                                form?.values.projects &&
                                                form?.values.projects.map((item, index) => (
                                                    <div key={index} className={styles.row}>
                                                        <Content>
                                                            <div className={styles.row}>
                                                                <FormFields.TextField
                                                                    name={`projects.${index}.year`}
                                                                    label={"Год работы"}
                                                                    classes={{ root: styles.year }}
                                                                />
                                                                <div
                                                                    className={
                                                                        styles.yearDescription
                                                                    }
                                                                >
                                                                    Если проект длился более одного
                                                                    года, то укажите год окончания
                                                                </div>
                                                            </div>
                                                            <FormFields.TextField
                                                                name={`projects.${index}.name`}
                                                                label={"Название проекта"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`projects.${index}.position`}
                                                                label={"Роль на проекте"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`projects.${index}.description`}
                                                                label={"Описание проекта"}
                                                                classes={{ root: styles.field }}
                                                                textarea
                                                            />
                                                            <FormFields.TextField
                                                                name={`projects.${index}.technologies`}
                                                                label={"Технологии"}
                                                                classes={{ root: styles.field }}
                                                                textarea
                                                            />
                                                        </Content>
                                                        <DashedLine
                                                            className={styles.dashedLine}
                                                            onClick={() => array.remove(index)}
                                                        />
                                                    </div>
                                                ))}
                                        </Content>
                                        <DashedButton
                                            onClick={() =>
                                                array.push({
                                                    year: "",
                                                    name: "",
                                                    position: "",
                                                    description: "",
                                                    technologies: "",
                                                })
                                            }
                                            className={styles.add}
                                        >
                                            Добавить еще
                                        </DashedButton>
                                    </>
                                )}
                            />
                        </EditWrapper>
                    </PageContent>
                </>
            )}
        />
    );
};
