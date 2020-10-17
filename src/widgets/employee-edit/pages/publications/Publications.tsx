import React, { useState } from "react";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { CustomForm } from "components/custom-form";
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

export const Publications = (props: IEmployeeEditPage) => {
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
                        <Title>Публикации</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <FieldArray
                                name={"publications"}
                                render={(array) => (
                                    <>
                                        <Content>
                                            {form?.values &&
                                                form?.values.publications &&
                                                form?.values.publications.map((item, index) => (
                                                    <div key={index} className={styles.row}>
                                                        <Content>
                                                            <FormFields.TextField
                                                                name={`publications.${index}.name`}
                                                                label={"Название ресурса"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`publications.${index}.description`}
                                                                label={"Название статьи"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`publications.${index}.link`}
                                                                label={"Ссылка на статью"}
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
