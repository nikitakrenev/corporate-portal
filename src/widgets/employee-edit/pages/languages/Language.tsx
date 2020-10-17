import { makeStyles } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import { HrAPI } from "api";
import { IEmployeeLang } from "entities";
import { useNotifications } from "hooks/app";
import { useEmployeeLanguageList } from "hooks/hr/useEmployeeLanguageList";
import React from "react";
import { languageService } from "services/languageService";
import { DashedButton } from "widgets/employee-edit/components/dashed-button";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { Back } from "../../components/back";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";

const useStyles = makeStyles({
    fieldsWrapper: {
        marginBottom: 32,
        display: "flex",
        alignItems: "center",
    },
    field: {
        width: 250,
        marginRight: 12,
    },
    addButton: {
        width: 512,
    },
    delButton: {
        height: 15,
        width: 15,
        color: "#0061F3",
        cursor: "pointer",
    },
});

export const Language: React.FC<IEmployeeEditPage> = ({ employeeId, goBack }) => {
    const innerClasses = useStyles();
    const {
        employeeLanguageList,
        addLanguageToList,
        removeLanguageFromList,
    } = useEmployeeLanguageList(employeeId);
    const { notifySuccess } = useNotifications();

    const submit = (values: IEmployeeLang[]) => {
        HrAPI.updateEmployeeLanguages(employeeId, values).then(() => {
            notifySuccess("Saved successful");
        });
    };

    const createLanguage = () => {
        HrAPI.createEmployeeLanguage(employeeId).then(addLanguageToList);
    };

    const removeLanguage = (idToRemove: number) => {
        HrAPI.deleteEmployeeLanguage(employeeId, idToRemove).then(() =>
            removeLanguageFromList(idToRemove),
        );
    };

    return (
        <CustomForm<IEmployeeLang[]>
            data={employeeLanguageList}
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
                        <Title>Знание языков</Title>
                        {form?.values.map((item, index) => (
                            <div className={innerClasses.fieldsWrapper} key={index}>
                                <FormFields.Select
                                    name={`${index}.title`}
                                    label={"Язык"}
                                    options={languageService.getLanguageOptions()}
                                    classes={{ root: innerClasses.field }}
                                />
                                <FormFields.Select
                                    name={`${index}.level`}
                                    label={"Уровень"}
                                    options={languageService.languageLevelOptions}
                                    classes={{ root: innerClasses.field }}
                                />
                                <Clear
                                    onClick={() => removeLanguage(item.id)}
                                    className={innerClasses.delButton}
                                />
                            </div>
                        ))}
                        <DashedButton className={innerClasses.addButton} onClick={createLanguage}>
                            Добавить еще
                        </DashedButton>
                    </PageContent>
                </>
            )}
        />
    );
};
