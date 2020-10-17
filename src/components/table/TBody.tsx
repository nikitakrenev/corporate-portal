import React, { FC } from "react";
import { TableBody } from "@material-ui/core";

export const TBody: FC = (props) => <TableBody {...props}>{props.children}</TableBody>;
