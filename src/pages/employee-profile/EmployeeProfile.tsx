import React, { useState } from "react";
import { PageContent } from "widgets/employee-edit/components/container";
import { EmployeeCard } from "../../widgets/employee-card";
import { PageHeader } from "../../components/page-header";
import { ArrowBack } from "@material-ui/icons";
import { PageContainer } from "../../widgets/page-container";
import { makeStyles } from "@material-ui/core/styles";
import { EmployeeData } from "../../widgets/employee-data";
import { useParams } from "react-router";
import { AppContext } from "../../context";
import { useEmployee } from "../../hooks/hr";

const useStyles = makeStyles(() => ({
    row: {
        color: "#0061F3",
        marginRight: "32px",
    },
}));

export const EmployeeProfile = () => {
    const [tab, setTab] = useState<"main" | "vacation">("main");
    const styles = useStyles();
    const { id } = useParams();
    const { employee } = useEmployee(String(id));

    const goBack = () => {
        AppContext.getHistory().push("/staff");
    };

    return (
        <PageContainer>
            <PageHeader
                buttonType={"none"}
                title={"Список сотрудников"}
                icon={<ArrowBack classes={{ root: styles.row }} />}
                goBack={goBack}
            />
            <PageContent noPadding={true}>
                <EmployeeCard
                    tab={tab}
                    employee={employee}
                    onSwitchTab={setTab}
                    employeeId={Number(id)}
                />
                <EmployeeData tab={tab} employee={employee} employeeId={Number(id)} />
            </PageContent>
        </PageContainer>
    );
};
