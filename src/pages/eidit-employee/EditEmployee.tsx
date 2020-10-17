import { HrAPI } from "api";
import { useNotifications } from "hooks/app";
import React from "react";
import { useParams } from "react-router";
import { EEmployeeEditKey, IUpdateEmployee } from "entities/employee";
import { EditEmployeeProfile, PageContainer } from "widgets";
import { AppContext } from "context";
import { useEmployee } from "hooks/hr";

const editEmployeePages = {
    [EEmployeeEditKey.MAIN]: EditEmployeeProfile.MainInfo,
    [EEmployeeEditKey.CONTACTS]: EditEmployeeProfile.Contacts,
    [EEmployeeEditKey.POSITION]: EditEmployeeProfile.Position,
    [EEmployeeEditKey.EDUCATION]: EditEmployeeProfile.Education,
    [EEmployeeEditKey.EXPERIENCE]: EditEmployeeProfile.Experience,
    [EEmployeeEditKey.LANGUAGES]: EditEmployeeProfile.Language,
    [EEmployeeEditKey.SKILLS]: EditEmployeeProfile.Skills,
    [EEmployeeEditKey.PROJECTS]: EditEmployeeProfile.Projects,
    [EEmployeeEditKey.COURSES]: EditEmployeeProfile.Courses,
    [EEmployeeEditKey.PUBLICATIONS]: EditEmployeeProfile.Publications,
    [EEmployeeEditKey.EVENTS]: EditEmployeeProfile.Events,
};

export const EditEmployee = () => {
    const { type, id } = useParams<{ type: EEmployeeEditKey; id: string }>();
    const { employeeForUpdate } = useEmployee(String(id));
    const { notifySuccess } = useNotifications();

    const goBack = () => {
        AppContext.getHistory().push(`/staff/${id}`);
    };

    const saveHandler = (values: Partial<IUpdateEmployee>) => {
        HrAPI.updateEmployee(values).then(() => notifySuccess("Employee updated"));
    };

    return (
        <PageContainer>
            {Object.keys(editEmployeePages).map((pageKey) => {
                const EditPageComponent = editEmployeePages[pageKey];
                return (
                    employeeForUpdate &&
                    pageKey === type && (
                        <EditPageComponent
                            key={pageKey}
                            goBack={goBack}
                            employeeId={+id}
                            employee={employeeForUpdate}
                            onSave={saveHandler}
                        />
                    )
                );
            })}
        </PageContainer>
    );
};
