import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel, Edit } from "@material-ui/icons";
import cn from "classnames";
import { AppContext } from "../../context";
import { ConfirmPopup } from "../../components/confirm-popup";
import { IProjectTableRow } from "../../entities";
import { CustomTablePagination } from "../custom-table-pagination";
import { usePagination } from "../../hooks/pagination";

interface Props {
    body?: IProjectTableRow[];

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

export const ProjectTable = (props: Props) => {
    const { body = [], onDelete } = props;
    const styles = useStyles();
    const [deleteModal, setDeleteModal] = useState(false);
    const [projectID, setProjectID] = useState(0);
    const { currentPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

    const pageData = useMemo<IProjectTableRow[]>(
        () =>
            rowsPerPage > 0
                ? body.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                : body,
        [body, rowsPerPage, currentPage],
    );

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className={styles.tableHead}>
                            <TableCell className={styles.headerCell}>Название проекта</TableCell>
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
                                onClick={() => AppContext.getHistory().push(`/projects/${item.id}`)}
                            >
                                <TableCell className={styles.bodyCell}>{item.name}</TableCell>
                                <TableCell className={cn(styles.actionsCell, styles.bodyCell)}>
                                    <div className={styles.actions}>
                                        <Edit
                                            className={styles.icon}
                                            onMouseDown={() =>
                                                AppContext.getHistory().push(
                                                    `/projects/${item.id}/edit`,
                                                )
                                            }
                                        />
                                        <Cancel
                                            className={styles.icon}
                                            onMouseDown={() => {
                                                setDeleteModal(true);
                                                setProjectID(item.id);
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
                description={"Ты пытаешься удалить проект"}
                onSubmit={() => {
                    setDeleteModal(false);
                    onDelete(projectID);
                }}
            />
        </>
    );
};
