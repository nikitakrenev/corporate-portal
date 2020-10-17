import { Link, LinkTypeMap } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
    linkRow: {
        display: "flex",
        alignItems: "center",
    },
    linkIcon: {
        marginRight: 10,
        fontSize: "1.5em",
    },
}));

export const LinkWithIcon: React.FC<LinkTypeMap["props"]> = ({ children, ...restProps }) => {
    const styles = useStyles();
    return (
        <span className={styles.linkRow}>
            <LinkIcon className={styles.linkIcon} /> <Link {...restProps}>{children}</Link>
        </span>
    );
};
