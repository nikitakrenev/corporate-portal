import cn from "classnames";
import { map, noop } from "lodash";
import React, { ChangeEvent } from "react";
import { TableList } from "components/table-list";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, TextField } from "@material-ui/core";
import { AddCircleOutline, Close } from "@material-ui/icons";
import { TrackingHours } from "components/tracking-hours";
import { Autocomplete } from "@material-ui/lab";
import { Table, TBody, TCell, THead, TRow } from "components/table";
import { CellValue } from "entities/sheet";
import { YearPlanning } from "../year-planning";

interface ISelectOption {
    id: number;
    title: string;
}

interface Props {
    projects: Array<{ id: number; name: string }>;
    employeeData: Array<{
        id: number;
        name: string;
        time: number;
        position: string;
        projectHours: Array<{ title: string; hours: number }>;
    }>;
    planningHeaders: string[];
    tableHeaders: string[];
    tableData: CellValue[][];
    employeeSelectOptions: ISelectOption[];
    selectedProjectIndex?: number;

    onAddEmployee?(option: ISelectOption): void;

    onSelectProject?(projectId: number): void;

    onChangePlannedCell?(changes: CellValue[]): void;

    onClickEmployeeRemoving(employeeId: number): void;

    onScrollToTableColumn(index: number): void;
}

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        width: "100%",
    },
    projects: {
        transform: "translateY(45px)",
    },
    projectsTable: {
        width: 320,
    },
    tableHead: {
        background: "#EEEEEE",
    },
    headerCell: {
        fontWeight: 600,
        height: 61,
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        borderRight: "1px solid #999999",
    },
    cell: {
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        borderRight: "1px solid #999999",
        height: 45,
    },
    employee: {
        width: 410,
    },
    time: {
        width: 110,
    },
    position: {
        width: 200,
    },
    icon: {
        marginLeft: "auto",
        cursor: "pointer",
    },
    projectData: {
        width: 720,
        transform: "translateY(45px)",
    },
    planning: {},
}));

export const ProjectPlanningTable = (props: Props) => {
    const {
        planningHeaders,
        tableHeaders,
        tableData,
        projects,
        employeeData,
        employeeSelectOptions,
        selectedProjectIndex,
        onAddEmployee = noop,
        onSelectProject = noop,
        onChangePlannedCell = noop,
        onClickEmployeeRemoving = noop,
        onScrollToTableColumn = noop,
    } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const defaultProps = {
        options: employeeSelectOptions,
        getOptionLabel: (option: ISelectOption) => option.title,
    };
    const styles = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeAutocomplete = (event: ChangeEvent, option: ISelectOption) => {
        onAddEmployee(option);
        handleClose();
    };

    return (
        <div className={styles.wrapper}>
            <TableList
                title={"Проект"}
                data={map(projects, "name")}
                classes={{ root: styles.projects, table: styles.projectsTable }}
                selectedRowIndex={selectedProjectIndex}
                onClickRow={onSelectProject}
            />
            <div>
                <Table className={styles.projectData}>
                    <THead>
                        <TRow className={styles.tableHead}>
                            <TCell className={cn(styles.headerCell, styles.employee)}>
                                Работник
                                <div onClick={handleClick} className={styles.icon}>
                                    <AddCircleOutline />
                                </div>
                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <div style={{ width: 300, padding: 20 }}>
                                        <Autocomplete
                                            {...defaultProps}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Поиск"
                                                    margin="normal"
                                                />
                                            )}
                                            onChange={onChangeAutocomplete}
                                        />
                                    </div>
                                </Popover>
                            </TCell>
                            <TCell className={cn(styles.headerCell, styles.time)}>Свободно</TCell>
                            <TCell className={cn(styles.headerCell, styles.position)}>
                                Должность
                            </TCell>
                        </TRow>
                    </THead>
                    <TBody>
                        {employeeData.map((item, index) => (
                            <TRow key={index}>
                                <TCell className={cn(styles.employee, styles.cell)}>
                                    {item.name}
                                    <Close
                                        className={styles.icon}
                                        onClick={() => onClickEmployeeRemoving(item.id)}
                                    />
                                </TCell>
                                <TCell className={cn(styles.time, styles.cell)}>
                                    <TrackingHours hours={item.time} projects={item.projectHours} />
                                </TCell>
                                <TCell className={cn(styles.position, styles.cell)}>
                                    {item.position}
                                </TCell>
                            </TRow>
                        ))}
                    </TBody>
                </Table>
            </div>
            <YearPlanning
                className={styles.planning}
                headers={planningHeaders}
                tableHeaders={tableHeaders}
                tableData={tableData}
                onCellsChange={onChangePlannedCell}
                onScrollToColumn={onScrollToTableColumn}
            />
        </div>
    );
};
