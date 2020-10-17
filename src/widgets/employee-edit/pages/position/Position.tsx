import { HrAPI } from "api";
import { useNotifications } from "hooks/app";
import { useDepartmentList } from "hooks/hr/useDepartmentList";
import { useEmployeePosition } from "hooks/hr/useEmployeePosition";
import { useLeaderList } from "hooks/hr/useLeaderList";
import { usePositionList } from "hooks/hr/usePositionList";
import React from "react";
import { employeeService } from "services/employeeService";
import { CustomForm, FormFields, PageHeader } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import { PageContent } from "../../components/container";
import { Title } from "../../components/title";
import { Content } from "../../components/content";
import * as Yup from "yup";
import { Back } from "../../components/back";
import { IEmployeeEditPage } from "../../IEmployeeEditPage";
import { IEmployeePosition } from "entities";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
    field: {
        width: 480,
    },
});

const validationSchema = Yup.object().shape({
    position: Yup.number().required(),
    department: Yup.number().required(),
    leader: Yup.number().required(),
});

export const Position: React.FC<IEmployeeEditPage> = ({ employeeId, goBack }) => {
    const innerClasses = useStyles();
    const employeePosition = useEmployeePosition(employeeId);
    const { departmentOptions } = useDepartmentList();
    const { positionOptions } = usePositionList();
    const { leaderOptions } = useLeaderList();
    const { notifySuccess } = useNotifications();

    const submit = (values: IEmployeePosition) => {
        HrAPI.updateEmployeePosition(employeeId, values).then(() =>
            notifySuccess("Saved successful"),
        );
    };

    return employeePosition ? (
        <CustomForm<IEmployeePosition>
            validationSchema={validationSchema}
            data={employeePosition ?? {}}
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
                        <Title>Должность, отдел, руководитель</Title>
                        <Content>
                            <FormFields.Select
                                name={"position"}
                                label={"Должность"}
                                options={positionOptions}
                                classes={{ root: innerClasses.field }}
                            />
                            <FormFields.Select
                                name={"grade"}
                                label={"Градация"}
                                options={[
                                    {
                                        label: "Нет",
                                        value: "",
                                    },
                                    ...employeeService.getGradeOptions(),
                                ]}
                                classes={{ root: innerClasses.field }}
                            />
                            <FormFields.Select
                                name={"department"}
                                label={"Отдел"}
                                options={departmentOptions}
                                classes={{ root: innerClasses.field }}
                            />
                            <FormFields.Select
                                name={"leader"}
                                label={"Руководитель"}
                                options={leaderOptions}
                                classes={{ root: innerClasses.field }}
                            />
                        </Content>
                    </PageContent>
                </>
            )}
        />
    ) : (
        <CircularProgress />
    );
};
