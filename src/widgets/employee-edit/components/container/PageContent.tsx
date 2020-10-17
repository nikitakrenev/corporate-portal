import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import cl from "classnames";

interface IPageContentProps {
    noPadding?: boolean;
}
const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%",
        flex: 1,
        overflow: "auto",
        width: "100%",
        padding: 40,
        "&._no-padding": {
            padding: 0,
        },
    },
}));

export const PageContent: FC<IPageContentProps> = ({ children, noPadding }) => {
    const styles = useStyles();
    return (
        <div
            className={cl(styles.container, {
                "_no-padding": noPadding,
            })}
        >
            {children}
        </div>
    );
};
