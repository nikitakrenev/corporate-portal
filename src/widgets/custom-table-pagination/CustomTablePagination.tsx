import React from "react";
import { TableFooter, TablePagination, TableRow } from "@material-ui/core";
import { TablePaginationActions } from "../table-pagination-actions";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    count: number;
    page: number;
    rowsPerPage?: number;

    handleChangePage(nextPage: number): void;

    handleChangeRowsPerPage(nextRowsPerPage: number): void;
}

const useStyles = makeStyles(() => ({
    tableFooter: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
    },
    paginationActions: {
        paddingLeft: 16,
    },
    pagination: {
        width: "calc(100% + 100px)",
        marginRight: -100,
        display: "flex",
    },
}));

export const CustomTablePagination = (props: Props) => {
    const { count, page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } = props;
    const styles = useStyles();

    return (
        <TableFooter>
            <TableRow className={styles.tableFooter}>
                <TablePagination
                    classes={{ toolbar: styles.paginationActions, root: styles.pagination }}
                    rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={"Строк на странице"}
                    labelDisplayedRows={({ from, to, count }) => `${from} - ${to} из ${count}`}
                    count={count}
                    page={page}
                    onChangePage={(event, nextPage) => handleChangePage(nextPage)}
                    onChangeRowsPerPage={(event) => handleChangeRowsPerPage(+event.target.value)}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};
