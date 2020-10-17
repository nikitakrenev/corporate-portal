import { HrAPI } from "api";
import { useNotifications } from "hooks/app";
import { useEmployeeEducationList } from "hooks/hr/useEmployeeEducationList";
import React, { useState } from "react";
import { EditWrapper } from "components/edit-wrapper";
import { employeeService } from "services/employeeService";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { IEmployeeEducation } from "entities/employee";
import { makeStyles } from "@material-ui/core/styles";
import { Title } from "../../components/title";
import { PageContent } from "../../components/container";
import { Back } from "../../components/back";
import { Content } from "../../components/content";
import { DashedLine } from "../../components/dashed-line";
import { DashedButton } from "../../components/dashed-button";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";

const useStyles = makeStyles({
    field: {
        width: 672,
    },
    fieldsWrapper: {
        display: "flex",
        marginBottom: 40,
    },
    addButton: {
        width: 672,
    },
    dashed: {
        marginLeft: 10,
    },
});

export const Education: React.FC<IEmployeeEditPage> = ({ employeeId, goBack }) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const innerClasses = useStyles();
    const { educationList, addEducationToList, removeEducationFromList } = useEmployeeEducationList(
        employeeId,
    );
    const { notifySuccess } = useNotifications();
    const submit = (values: IEmployeeEducation[]) => {
        HrAPI.updateEducation(employeeId, values).then(() => {
            notifySuccess("Saved successful");
        });
    };

    const createEducation = () => {
        HrAPI.createEducation(employeeId).then(addEducationToList);
    };

    const removeEducation = (educationId: number) => {
        HrAPI.deleteEducation(employeeId, educationId).then(() =>
            removeEducationFromList(educationId),
        );
    };

    const getNameWithTranslation = (index: number, name: string) => {
        return tab === "ru" ? `${index}.${name}` : `${index}.translation.${name}`;
    };

    return (
        <CustomForm<IEmployeeEducation[]>
            data={educationList}
            onSubmit={submit}
            render={(form) => (
                <>
                    <PageHeader
                        title={"Профиль сотрудника"}
                        handler={form?.handleSubmit}
                        buttonType={"save"}
                        goBack={goBack}
                        icon={<Back />}
                    />
                    <PageContent>
                        <Title>Образование</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            {form.values.map((item, index) => (
                                <div className={innerClasses.fieldsWrapper} key={index}>
                                    <Content>
                                        <FormFields.TextField
                                            name={`${index}.year`}
                                            label={"Годы обучения"}
                                            classes={{ root: innerClasses.field }}
                                        />
                                        <FormFields.Select
                                            name={`${index}.level`}
                                            label={"Уровень образования"}
                                            options={employeeService.getEducationLevelOptions()}
                                            classes={{ root: innerClasses.field }}
                                        />

                                        <FormFields.TextField
                                            textarea={true}
                                            name={getNameWithTranslation(index, "name")}
                                            label={"Учебное заведение"}
                                            classes={{ root: innerClasses.field }}
                                        />
                                        <FormFields.TextField
                                            textarea={true}
                                            name={getNameWithTranslation(index, "faculty")}
                                            label={"Факультет"}
                                            classes={{ root: innerClasses.field }}
                                        />
                                        <FormFields.TextField
                                            textarea={true}
                                            name={getNameWithTranslation(index, "speciality")}
                                            label={"Специальность"}
                                            classes={{ root: innerClasses.field }}
                                        />
                                    </Content>
                                    <DashedLine
                                        onClick={() => removeEducation(item.id)}
                                        className={innerClasses.dashed}
                                    />
                                </div>
                            ))}
                            <DashedButton
                                className={innerClasses.addButton}
                                onClick={createEducation}
                            >
                                Добавить место обучения
                            </DashedButton>
                        </EditWrapper>
                    </PageContent>
                </>
            )}
        />
    );
};
