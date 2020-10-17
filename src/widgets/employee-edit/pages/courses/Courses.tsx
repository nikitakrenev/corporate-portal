import React, { useState } from "react";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { CustomForm } from "../../../../components/custom-form";
import { Back } from "../../components/back";
import { PageHeader } from "components/page-header";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray } from "formik";
import { Content } from "../../components/content";
import { FormFields } from "../../../../components";
import { DashedLine } from "../../components/dashed-line";
import { DashedButton } from "../../components/dashed-button";
import { EditWrapper } from "components/edit-wrapper";
import { IUpdateEmployee } from "entities/employee";

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
        width: 300,
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

export const Courses = (props: IEmployeeEditPage) => {
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
                        <Title>Курсы</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <FieldArray
                                name={"courses"}
                                render={(array) => (
                                    <>
                                        <Content>
                                            {form?.values &&
                                                form?.values.courses &&
                                                form?.values.courses.map((item, index) => (
                                                    <div key={index} className={styles.row}>
                                                        <Content>
                                                            <div className={styles.row}>
                                                                <FormFields.TextField
                                                                    name={`courses.${index}.year`}
                                                                    label={"Год окончания"}
                                                                    classes={{ root: styles.year }}
                                                                />
                                                                <div
                                                                    className={
                                                                        styles.yearDescription
                                                                    }
                                                                >
                                                                    Если вы еще не завершили курс,
                                                                    то укажите предологаемый год
                                                                    окончания курса
                                                                </div>
                                                            </div>
                                                            <FormFields.TextField
                                                                name={`courses.${index}.name`}
                                                                label={"Учебное заведение"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`courses.${index}.description`}
                                                                label={"Название курса"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`courses.${index}.link`}
                                                                label={"Ссылка на курс"}
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
                                                    description: "",
                                                    link: "",
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
