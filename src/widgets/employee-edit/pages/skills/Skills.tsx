import React, { useEffect, useState } from "react";
import { EditWrapper } from "components/edit-wrapper";
import { Chip, CustomForm, FormFields, PageHeader } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import { Back } from "../../components/back";
import { Title } from "../../components/title";
import { PageContent } from "../../components/container";
import { Content } from "../../components/content";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { IUpdateEmployee } from "entities/employee";

const useStyles = makeStyles({
    skills: {
        display: "flex",
        alignItems: "center",
        width: 1000,
        flexWrap: "wrap",
    },
    field: {
        width: 686,
    },
    skillsField: {
        width: 624,
        margin: 0,
    },
    addButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 54,
        height: 54,
        marginLeft: 10,
        background: "#CECED1",
        borderRadius: 4,
        "&:hover": {
            cursor: "pointer",
            background: "#0061F3",
        },
    },
    checkIcon: {
        color: "#FFFFFF",
    },
});

export const Skills = (props: IEmployeeEditPage) => {
    const [tab, setTab] = useState<"ru" | "eng">("ru");
    const innerClasses = useStyles();
    const [chips, setChips] = useState<string[]>([]);

    useEffect(() => {
        if (props.employee) {
            setChips(props.employee.skills);
        }
    }, [props.employee?.skills]);

    const onDeleteChip = (index: number) => {
        chips.splice(index, 1);
        setChips([...chips]);
    };

    const addSkills = (skills?: string) => {
        if (skills) {
            setChips(chips.concat(skills.trim().split(",")));
        }
    };

    return (
        <CustomForm<Partial<IUpdateEmployee>>
            data={{ ...props.employee, skills: [] }}
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
                        <Title>Навыки</Title>
                        <EditWrapper tab={tab} onSwitchTab={setTab}>
                            <Content>
                                {chips.length > 0 && (
                                    <div className={innerClasses.skills}>
                                        {chips.map((item, index) => (
                                            <Chip
                                                title={item}
                                                onDelete={() => onDeleteChip(index)}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className={innerClasses.skills}>
                                    <FormFields.TextField
                                        name={"skills"}
                                        label={"Введите свои навыки через запятую"}
                                        classes={{ root: innerClasses.skillsField }}
                                        textarea={true}
                                    />
                                    <div
                                        className={innerClasses.addButton}
                                        onClick={() => {
                                            addSkills(String(form?.values.skills));
                                            form?.setFieldValue("skills", "");
                                        }}
                                    >
                                        <CheckIcon classes={{ root: innerClasses.checkIcon }} />
                                    </div>
                                </div>
                                <FormFields.TextField
                                    name={"personalQualities"}
                                    label={"Ваши личные качества"}
                                    classes={{ root: innerClasses.field }}
                                    textarea={true}
                                />
                            </Content>
                        </EditWrapper>
                    </PageContent>
                </div>
            )}
        />
    );
};
