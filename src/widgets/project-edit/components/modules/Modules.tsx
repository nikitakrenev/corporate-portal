import React, { useState } from "react";
import { Clear } from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { TextField } from "@material-ui/core";

interface Props {
    name: string;
}

const useStyles = makeStyles({
    moduleField: {
        width: 416,
    },
    modules: {
        display: "flex",
        alignItems: "center",
        width: 480,
        flexWrap: "wrap",
    },
    chip: {
        margin: "0 12px 12px 0",
        background: "#F0F6FF",
        borderRadius: 4,
        height: 32,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "16px",
        fontFamily: "Roboto, sans-serif",
        color: "#7187A6",
        padding: "8px 16px",
    },
    close: {
        color: "#828496",
        width: 15,
        height: 15,
        marginLeft: "auto",
        paddingLeft: 5,
        cursor: "pointer",
    },
    checkIcon: {
        color: "#FFFFFF",
    },
    addButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 54,
        height: 54,
        marginLeft: 10,
        background: "#CECED1",
        borderRadius: 4,
        "&:hover": {
            cursor: "pointer",
            background: "#0061F3",
        },
    },
});

export const Modules: React.FC<Props> = ({ name }) => {
    const styles = useStyles();
    const { values, setFieldValue } = useFormikContext();
    const [chips, setChips] = useState<string[]>(values[name] ?? []);
    const [nextModuleValue, setNextModuleValue] = useState("");

    const delModule = (moduleIdToDelete) => {
        setChips(chips.filter((value, index) => index !== moduleIdToDelete));
        setFieldValue(name, chips);
    };

    const addModules = () => {
        setChips(chips.concat(nextModuleValue.trim().split(",")));
        setFieldValue(name, chips);
        setNextModuleValue("");
    };

    return (
        <>
            {chips.length > 0 && (
                <div className={styles.modules}>
                    {chips.map((item, index) => (
                        <div className={styles.chip} key={index}>
                            {item}
                            {delModule && (
                                <Clear className={styles.close} onClick={() => delModule(index)} />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.modules}>
                <TextField
                    value={nextModuleValue}
                    label={"Введите модули через запятую"}
                    onChange={(event) => setNextModuleValue(event.target.value)}
                    variant={"outlined"}
                    classes={{ root: styles.moduleField }}
                />
                <div className={styles.addButton} onClick={addModules}>
                    <CheckIcon classes={{ root: styles.checkIcon }} />
                </div>
            </div>
        </>
    );
};
