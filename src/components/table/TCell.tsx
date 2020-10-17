import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableCellProps } from "@material-ui/core";
import cn from "classnames";

const useStyles = makeStyles(() => ({
    cell: {
        boxSizing: "border-box",
        alignItems: "center",
        borderRight: "1px solid #999999",
        height: 45,
    },
    head: {
        fontWeight: 600,
        height: 60,
        boxSizing: "border-box",
    },
}));

export const TCell: FC<TableCellProps> = (props) => {
    const styles = useStyles();

    return (
        <TableCell
            {...props}
            classes={{
                root: cn(styles.cell, props.classes?.root),
                head: cn(styles.head, props.classes?.head),
                ...props.classes,
            }}
        >
            {props.children}
        </TableCell>
    );
};
