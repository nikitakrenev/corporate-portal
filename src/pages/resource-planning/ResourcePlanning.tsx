import { PageContent } from "widgets/employee-edit/components/container";
import { PageHeader } from "../../components/page-header";
import { PageContainer } from "../../widgets/page-container";
import { findIndex, first, isEmpty, range, reduce, toNumber } from "lodash";
import moment from "moment";
import React from "react";
import { ResourcePlanningTable } from "widgets/resource-planning-table";
import { usePlanning } from "../../hooks";

export const ResourcePlanning = () => {
    const {
        weekTitles,
        employeeList,
        employeesInfo,
        employeeProjects,
        resourcePlanning,
        selection,
        selectPeriod,
        setSelection,
        editPlanningItem,
    } = usePlanning();
    const tableHeaders = reduce<number, string[]>(
        range(moment().isoWeeksInYear()),
        (results) => {
            return results.concat(["B", "P", "A"]);
        },
        [],
    );
    const tableData = resourcePlanning.map((items) =>
        reduce(
            items,
            (results, { budgeted, planned, actual, ...rest }) => {
                return results.concat([
                    { value: budgeted, name: "budgeted", data: rest },
                    { value: planned, name: "planned", data: rest },
                    { value: actual, name: "actual", data: rest },
                ]);
            },
            [],
        ),
    );
    const selectedEmployeeIndex = findIndex(employeeList, { id: selection.employeeId });
    const selectPeriodByIndex = (index: number) => selectPeriod(weekTitles[index]);

    const onSelectEmployee = (index: number) =>
        setSelection({ employeeId: employeeList[index]?.id });

    const onChangePlannedCell = (
        changes: Array<{ value: number; name: string; data: { id: number } }>,
    ) =>
        changes.map((cell) =>
            editPlanningItem({ ...cell.data, [cell.name]: toNumber(cell.value) || 0 }),
        );

    React.useEffect(() => {
        if (isEmpty(selection)) {
            setSelection({ projectId: first(employeeList)?.id });
        }
    }, [selection, employeeList]);

    return (
        <PageContainer>
            <PageHeader title={"Планирование  по ресурсам"} />
            <PageContent>
                <ResourcePlanningTable
                    projects={employeeProjects}
                    employeeData={employeesInfo}
                    planningHeaders={(first(resourcePlanning) || []).map((item) => item.period)}
                    tableHeaders={tableHeaders}
                    tableData={tableData}
                    selectedEmployeeIndex={selectedEmployeeIndex}
                    onSelectEmployee={onSelectEmployee}
                    onChangePlannedCell={onChangePlannedCell}
                    onScrollToTableColumn={selectPeriodByIndex}
                />
            </PageContent>
        </PageContainer>
    );
};
