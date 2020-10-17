import { makeStyles } from "@material-ui/core/styles";
import { findIndex, first, isEmpty, range, reduce, toNumber } from "lodash";
import moment from "moment";
import React from "react";
import { PageHeader } from "../../components/page-header";
import { ProjectPlanningTable, PageContainer } from "../../widgets";
import { usePlanning } from "../../hooks";

const useStyles = makeStyles(() => ({
    content: {
        padding: 40,
        display: "flex",
        height: "100%",
    },
}));

export const ProjectPlanning = () => {
    const classes = useStyles();
    const {
        weekTitles,
        projectList,
        employeeList,
        projectEmployeesInfo,
        projectPlanning,
        selection,
        selectPeriod,
        addEmployeeToProjectTeam,
        setSelection,
        editPlanningItem,
        removeEmployeeFromProject,
    } = usePlanning();
    const tableHeaders = reduce<number, string[]>(
        range(moment().isoWeeksInYear()),
        (results) => {
            return results.concat(["B", "P", "A"]);
        },
        [],
    );
    const tableData = projectPlanning.map((items) =>
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
    const selectedProjectIndex = findIndex(projectList, { id: selection.projectId });
    const selectPeriodByIndex = (index: number) => selectPeriod(weekTitles[index]);

    const onAddEmployee = ({ id: employeeId }) => addEmployeeToProjectTeam(employeeId);

    const onSelectProject = (index: number) => setSelection({ projectId: projectList[index]?.id });

    const onChangePlannedCell = (
        changes: Array<{ value: number; name: string; data: { id: number } }>,
    ) =>
        changes.map((cell) =>
            editPlanningItem({ ...cell.data, [cell.name]: toNumber(cell.value) || 0 }),
        );

    React.useEffect(() => {
        if (isEmpty(selection)) {
            setSelection({ projectId: first(projectList)?.id });
        }
    }, [selection, projectList]);

    return (
        <PageContainer>
            <PageHeader title={"Планирование  по проектам"} />
            <div className={classes.content}>
                <ProjectPlanningTable
                    projects={projectList}
                    employeeData={projectEmployeesInfo}
                    planningHeaders={(first(projectPlanning) || []).map((item) => item.period)}
                    tableHeaders={tableHeaders}
                    tableData={tableData}
                    employeeSelectOptions={employeeList.map((item) => ({
                        id: item.id,
                        title: item.name,
                    }))}
                    selectedProjectIndex={selectedProjectIndex}
                    onAddEmployee={onAddEmployee}
                    onSelectProject={onSelectProject}
                    onChangePlannedCell={onChangePlannedCell}
                    onClickEmployeeRemoving={removeEmployeeFromProject}
                    onScrollToTableColumn={selectPeriodByIndex}
                />
            </div>
        </PageContainer>
    );
};
