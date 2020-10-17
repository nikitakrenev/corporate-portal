import { useNotifications } from "hooks/app";
import { useEffect } from "react";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Transport } from "services/transport";
import { Sidebar } from "widgets/sidebar";

const useStyles = makeStyles(() => ({
    pageRoot: {
        display: "flex",
    },
    sidebar: {
        width: 240,
    },
    content: {
        flex: 1,
        height: "100vh",
        width: "calc(100% - 240px)",
        overflow: "hidden",
    },
}));

export const PageRoot: React.FC = ({ children }) => {
    const styles = useStyles();
    const { notifyError } = useNotifications();

    useEffect(() => {
        Transport.errorHandler = (error) => {
            const message = error.response?.data ? (
                <>
                    [{error.response.data.status}] {error.response.config.method.toUpperCase()}{" "}
                    {error.response.data.path} <br />
                    {error.response.data.message}
                </>
            ) : (
                error.message
            );
            notifyError(message);
        };
    }, []);

    return (
        <div className={styles.pageRoot}>
            <Sidebar />
            <div className={styles.content}>{children}</div>
        </div>
    );
};
