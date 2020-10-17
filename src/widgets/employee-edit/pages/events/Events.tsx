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
import { IUpdateEmployee } from "entities";
import { CircularProgress } from "@material-ui/core";
const useStyles = makeStyles(() => ({
    row: {
        display: "flex",
    },
    short: {
        width: 200,
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

export const Events = (props: IEmployeeEditPage) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const styles = useStyles();

    return props.employee ? (
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
                                name={"events"}
                                render={(array) => (
                                    <>
                                        <Content>
                                            {form?.values &&
                                                form?.values.events &&
                                                form?.values.events.map((item, index) => (
                                                    <div key={index} className={styles.row}>
                                                        <Content>
                                                            <FormFields.TextField
                                                                name={`events.${index}.year`}
                                                                label={"Год участия"}
                                                                classes={{ root: styles.short }}
                                                            />
                                                            <FormFields.TextField
                                                                name={`events.${index}.name`}
                                                                label={"Название мероприятия"}
                                                                classes={{ root: styles.field }}
                                                            />
                                                            <FormFields.Select
                                                                name={`events.${index}.role.id`}
                                                                label={"Роль"}
                                                                classes={{ root: styles.short }}
                                                                options={[
                                                                    {
                                                                        value: 1,
                                                                        label: "Участник",
                                                                    },
                                                                    {
                                                                        value: 2,
                                                                        label: "Спикер",
                                                                    },
                                                                ]}
                                                            />
                                                            {form?.values.events[index].role.id ===
                                                                2 && (
                                                                <FormFields.TextField
                                                                    name={`events.${index}.theme`}
                                                                    label={"Тема выступления"}
                                                                    classes={{ root: styles.field }}
                                                                />
                                                            )}
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
                                                    role: "",
                                                    theme: "",
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
    ) : (
        <CircularProgress />
    );
};
