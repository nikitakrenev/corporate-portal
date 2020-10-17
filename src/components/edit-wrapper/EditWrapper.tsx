import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TEmployeeLangTab } from "entities";
import cn from "classnames";

interface Props {
    tab?: TEmployeeLangTab;
    className?: string;

    onSwitchTab?(tab: TEmployeeLangTab): void;
}

const useStyles = makeStyles({
    langTabs: {
        paddingBottom: 42,
        display: "flex",
    },
    langTab: {
        marginRight: "24px",
        padding: "11px 0",
        "&:hover": {
            cursor: "pointer",
        },
    },
    langTabText: {
        fontSize: "16px",
        lineHeight: "19px",
        fontFamily: "Roboto, sans-serif",
    },
    activeTab: {
        color: "#0061F3",
        borderBottom: "2px solid #0061F3",
    },
});

export const EditWrapper: FC<Props> = (props) => {
    const { children, onSwitchTab, tab = "ru" } = props;
    const classes = useStyles();

    const handleSwitch = (tab: TEmployeeLangTab) => {
        if (onSwitchTab) {
            onSwitchTab(tab);
        }
    };

    return (
        <>
            <div className={classes.langTabs}>
                <div
                    className={cn(classes.langTab, tab === "ru" && classes.activeTab)}
                    onClick={() => handleSwitch("ru")}
                >
                    <span className={classes.langTabText}>Русский</span>
                </div>
                <div
                    className={cn(classes.langTab, tab === "eng" && classes.activeTab)}
                    onClick={() => handleSwitch("eng")}
                >
                    <span className={classes.langTabText}>English</span>
                </div>
            </div>
            <div>{children}</div>
        </>
    );
};
