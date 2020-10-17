import cn from "classnames";
import { map, noop } from "lodash";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { CellValue } from "entities/sheet";
import { Table, TBody, TCell, THead, TRow } from "../../components/table";
import { TrackingHours } from "../../components/tracking-hours";
import { TableList } from "../../components/table-list";
import { YearPlanning } from "../year-planning";

interface Props {
    projects: Array<{ id: number; name: string }>;
    employeeData: Array<{
        name: string;
        time: number;
        position: string;
    }>;
    planningHeaders: string[];
    tableHeaders: string[];
    tableData: CellValue[][];
    selectedEmployeeIndex: number;

    onChangePlannedCell?(changes: CellValue[]): void;

    onSelectEmployee?(index: number): void;

    onScrollToTableColumn(index: number): void;
}

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
    },
    field: {
        marginBottom: 5,
    },
    employeeTable: {
        width: 720,
    },
    name: {
        width: 410,
    },
    time: {
        width: 110,
    },
    position: {
        width: 200,
    },
    projects: {
        transform: "translateY(37px)",
    },
    projectsTable: {
        width: 320,
    },
    yearTable: {
        marginTop: -8,
    },
    cell: {
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        borderRight: "1px solid #999999",
        height: 45,
    },
    row: {
        display: "flex",
    },
    selectedRow: {
        background: "#EEEEEE",
    },
}));

export const ResourcePlanningTable = (props: Props) => {
    const {
        projects,
        employeeData,
        planningHeaders,
        tableHeaders,
        tableData,
        selectedEmployeeIndex,
        onChangePlannedCell = noop,
        onSelectEmployee = noop,
        onScrollToTableColumn = noop,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <div className={styles.employeeTable}>
                <TextField
                    fullWidth
                    placeholder={"Поиск"}
                    classes={{ root: styles.field }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Table classes={{ root: styles.employeeTable }}>
                    <THead>
                        <TRow>
                            <TCell classes={{ root: styles.name }}>ФИО</TCell>
                            <TCell classes={{ root: styles.time }}>Свободно</TCell>
                            <TCell classes={{ root: styles.position }}>Должность</TCell>
                        </TRow>
                    </THead>
                    <TBody>
                        {employeeData.map((item, index) => (
                            <TRow
                                key={index}
                                className={cn({
                                    [styles.row]: true,
                                    [styles.selectedRow]: index === selectedEmployeeIndex,
                                })}
                                onClick={() => onSelectEmployee(index)}
                            >
                                <TCell className={cn(styles.name, styles.cell)}>{item.name}</TCell>
                                <TCell className={cn(styles.time, styles.cell)}>
                                    <TrackingHours
                                        hours={item.time}
                                        projects={[
                                            {
                                                title: "project",
                                                hours: 10,
                                            },
                                            {
                                                title: "project2",
                                                hours: 50,
                                            },
                                        ]}
                                    />
                                </TCell>
                                <TCell className={cn(styles.position, styles.cell)}>
                                    {item.position}
                                </TCell>
                            </TRow>
                        ))}
                    </TBody>
                </Table>
            </div>
            <TableList
                title={"Проект"}
                data={map(projects, "name")}
                classes={{ root: styles.projects, table: styles.projectsTable }}
            />
            <YearPlanning
                className={styles.yearTable}
                headers={planningHeaders}
                tableHeaders={tableHeaders}
                tableData={tableData}
                onCellsChange={onChangePlannedCell}
                onScrollToColumn={onScrollToTableColumn}
            />
        </div>
    );
};
