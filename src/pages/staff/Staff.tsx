import { HrAPI } from "api";
import { IFetchEmployeeListParams } from "api/params/IFetchEmployeeListParams";
import { useNotifications } from "hooks/app";
import React, { useMemo, useState } from "react";
import { PageContainer } from "widgets/page-container";
import { PageHeader } from "components/page-header";
import { makeStyles } from "@material-ui/core/styles";
import { EmployeeTable } from "widgets/employee-table";
import { EmployeePopup } from "widgets/employee-popup";
import { useEmployeeList } from "hooks/hr";
import { Toolbar } from "components/toolbar";
import { skills, departments } from "./data";
import { Filter } from "components/filter";
import { TEmployeesView } from "entities";
import { Employee } from "components/employee";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        alignItems: "flex-start",
        padding: 40,
    },
    table: {
        width: "100%",
    },
}));

export const Staff = () => {
    const styles = useStyles();
    const [isOpenCreateForm, setOpenCreateForm] = useState(false);
    const [searchString, setSearchString] = useState("");
    const fetchEmployeeListParams: IFetchEmployeeListParams = useMemo(
        () => ({
            searchString,
        }),
        [searchString],
    );
    const { employees, fetchEmployees } = useEmployeeList(fetchEmployeeListParams);
    const [view, setView] = useState<TEmployeesView>("list");
    const { notifySuccess } = useNotifications();

    const successCreateHandler = () => {
        setOpenCreateForm(false);
        fetchEmployees();
        notifySuccess("Employee created");
    };

    const deleteEmployee = (idForDelete: number) => {
        HrAPI.deleteEmployee(idForDelete).then(() => {
            fetchEmployees();
            notifySuccess(`Employee ${idForDelete} deleted`);
        });
    };

    return (
        <>
            <PageContainer>
                <PageHeader
                    title={"Сотрудники"}
                    handler={() => setOpenCreateForm(true)}
                    buttonType={"add"}
                />
                <div className={styles.wrapper}>
                    <div className={styles.table}>
                        <Toolbar
                            view={view}
                            onSwitchView={setView}
                            searchString={searchString}
                            onChangeSearchString={setSearchString}
                        />
                        {view === "list" && (
                            <EmployeeTable body={employees} onDelete={deleteEmployee} />
                        )}
                        {view === "bars" && <Employee employees={employees} />}
                    </div>
                    <Filter skills={skills} departments={departments} />
                </div>
            </PageContainer>

            <EmployeePopup
                open={isOpenCreateForm}
                onClose={() => setOpenCreateForm(false)}
                onSuccess={successCreateHandler}
            />
        </>
    );
};
