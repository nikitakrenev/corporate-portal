import React, { FC } from "react";
import { TableRow, TableRowProps } from "@material-ui/core";

export const TRow: FC<TableRowProps> = (props) => <TableRow {...props}>{props.children}</TableRow>;
