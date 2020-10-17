import React, { FC } from "react";
import { TableProps } from "@material-ui/core/Table/Table";
import { Table as MaterialTable } from "@material-ui/core";

export const Table: FC<TableProps> = (props) => (
    <MaterialTable {...props}>{props.children}</MaterialTable>
);
