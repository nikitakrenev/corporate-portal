import cn from "classnames";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    title: string;
    data?: string[];
    classes?: {
        root?: string;
        head?: string;
        body?: string;
        table?: string;
    };
    selectedRowIndex?: number;

    onClickRow?(index: number): void;
}

const useStyles = makeStyles(() => ({
    wrapper: {
        borderLeft: "1px solid #999999",
        borderRight: "1px solid #999999",
        borderBottom: "1px solid #999999",
        height: "100%",
    },
    tableHead: {
        background: "#EEEEEE",
    },
    headerCell: {
        fontWeight: 600,
        height: 60,
        boxSizing: "border-box",
    },
    bodyCell: {
        padding: "10px 16px",
        height: 45,
        boxSizing: "border-box",
    },
    tableRow: {
        cursor: "pointer",
    },
    selectedRow: {
        background: "#EEEEEE",
    },
}));

export const TableList = (props: Props) => {
    const { classes, title, data = [], selectedRowIndex, onClickRow } = props;
    const styles = useStyles();

    const handleClickRow = (index: number) => {
        if (onClickRow) {
            onClickRow(index);
        }
    };

    return (
        <div className={cn(styles.wrapper, classes?.root)}>
            <Table className={classes?.table}>
                <TableHead>
                    <TableRow className={cn(styles.tableHead, classes?.head)}>
                        <TableCell className={styles.headerCell}>{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes?.body}>
                    {data.map((value, index) => (
                        <TableRow
                            className={styles.tableRow}
                            key={index}
                            onClick={() => handleClickRow(index)}
                        >
                            <TableCell
                                className={cn({
                                    [styles.bodyCell]: true,
                                    [styles.selectedRow]: index === selectedRowIndex,
                                })}
                            >
                                {value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
