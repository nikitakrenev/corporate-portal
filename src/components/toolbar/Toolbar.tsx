import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { ListIcon } from "pages/projects/ListIcon";
import { BarIcon } from "pages/projects/BarIcon";
import { TEmployeesView } from "entities";

interface Props {
    view?: TEmployeesView;
    searchString: string;
    onChangeSearchString(searchString: string): void;

    onSwitchView?(view: TEmployeesView): void;
}

const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        paddingBottom: 40,
    },
    searchField: {
        width: "100%",
        height: 40,
        marginRight: 84,
    },
    input: {
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16,
    },
    icon: {
        cursor: "pointer",
        marginRight: 10,
        borderRadius: 4,
        "&:last-child": {
            marginRight: 0,
        },
    },
});

export const Toolbar: FC<Props> = (props) => {
    const { onSwitchView, view = "list", searchString, onChangeSearchString } = props;
    const styles = useStyles();

    const setView = (view: TEmployeesView) => {
        if (onSwitchView) {
            onSwitchView(view);
        }
    };

    return (
        <div className={styles.toolbar}>
            <TextField
                variant={"outlined"}
                placeholder={"Поиск..."}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color={"disabled"} />
                        </InputAdornment>
                    ),
                    classes: {
                        root: styles.input,
                    },
                }}
                classes={{ root: styles.searchField }}
                value={searchString}
                onChange={(e) => onChangeSearchString(e.target.value)}
            />
            <div className={styles.icon}>
                <ListIcon active={view === "list"} onClick={() => setView("list")} />
            </div>
            <div className={styles.icon}>
                <BarIcon active={view === "bars"} onClick={() => setView("bars")} />
            </div>
        </div>
    );
};
