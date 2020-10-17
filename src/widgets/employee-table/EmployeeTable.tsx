import React, { useMemo, useState } from "react";
import { IEmployeeTableRow } from "entities";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import cn from "classnames";
import { Cancel, Edit } from "@material-ui/icons";
import { ConfirmPopup } from "components/confirm-popup";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "context";
import { usePagination } from "../../hooks/pagination";
import { CustomTablePagination } from "../custom-table-pagination";

interface Props {
    body?: IEmployeeTableRow[];

    onEdit?(data: IEmployeeTableRow): void;

    onDelete?(id): void;
}

const useStyles = makeStyles((theme) => ({
    actions: {
        display: "flex",
    },
    headerCell: {
        fontWeight: 600,
    },
    actionsCell: {
        width: 100,
        boxSizing: "border-box",
    },
    icon: {
        marginRight: 10,
        cursor: "pointer",
    },
    popupContent: {
        padding: theme.spacing(2),
    },
    tableHead: {
        background: "#EEEEEE",
    },
    bodyCell: {
        padding: "10px 16px",
    },
    tableRow: {
        cursor: "pointer",
    },
}));

export const EmployeeTable = (props: Props) => {
    const { body = [], onDelete } = props;
    const styles = useStyles();
    const [, setEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [id, setId] = useState(0);
    const { currentPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

    const pageData = useMemo<IEmployeeTableRow[]>(
        () =>
            rowsPerPage > 0
                ? body.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                : body,
        [body, rowsPerPage, currentPage],
    );

    const onRowClick = (index: number) => {
        AppContext.getHistory().push(`/staff/${index}`);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className={styles.tableHead}>
                            <TableCell className={styles.headerCell}>ФИО</TableCell>
                            <TableCell className={styles.headerCell}>Отдел</TableCell>
                            <TableCell className={styles.headerCell}>Должность</TableCell>
                            <TableCell className={styles.headerCell}>Телефон</TableCell>
                            <TableCell className={styles.headerCell}>Роль</TableCell>
                            <TableCell className={cn(styles.headerCell, styles.actionsCell)}>
                                Действия
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageData.map((item, index) => (
                            <TableRow
                                className={styles.tableRow}
                                key={index}
                                onClick={() => onRowClick(item.id)}
                            >
                                <TableCell
                                    className={styles.bodyCell}
                                >{`${item.lastName} ${item.firstName} ${item.middleName}`}</TableCell>
                                <TableCell className={styles.bodyCell}>
                                    {item.department.title}
                                </TableCell>
                                <TableCell className={styles.bodyCell}>
                                    {item.position.title}
                                </TableCell>
                                <TableCell className={styles.bodyCell}>{item.phone}</TableCell>
                                <TableCell className={styles.bodyCell}>
                                    {item.position.title}
                                </TableCell>
                                <TableCell className={cn(styles.actionsCell, styles.bodyCell)}>
                                    <div className={styles.actions}>
                                        <Edit
                                            className={styles.icon}
                                            onMouseDown={() => {
                                                setEdit(true);
                                            }}
                                        />
                                        <Cancel
                                            className={styles.icon}
                                            onMouseDown={() => {
                                                setDeleteModal(true);
                                                setId(item.id);
                                            }}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {body.length > 10 && (
                        <CustomTablePagination
                            count={body.length}
                            page={currentPage}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                </Table>
            </TableContainer>
            <ConfirmPopup
                title={"Внимание"}
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                description={"Ты пытаешься удалить сотрудника"}
                onSubmit={() => {
                    setDeleteModal(false);
                    onDelete(id);
                }}
            />
        </>
    );
};
