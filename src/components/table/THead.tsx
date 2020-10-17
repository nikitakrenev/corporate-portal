import React, { FC } from "react";
import { TableHead } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";
import { TableHeadProps } from "@material-ui/core/TableHead/TableHead";

const useStyles = makeStyles(() => ({
    tableHead: {
        background: "#EEEEEE",
    },
}));

export const THead: FC<TableHeadProps> = (props) => {
    const styles = useStyles();
    return (
        <TableHead className={cn(styles.tableHead, props.className)} {...props}>
            {props.children}
        </TableHead>
    );
};
