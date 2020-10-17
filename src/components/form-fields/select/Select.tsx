import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import {
    Select as MaterialSelect,
    FormControl,
    MenuItem,
    InputLabel,
    Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage, IErrorMessageProps } from "../error-message";

export interface IOption {
    value: string | number;
    label?: string;

    handler?(): void;
}

interface ISelectProps {
    name: string;
    options: IOption[];
    label?: string;
    classes?: object;
    disable?: boolean;
    multiple?: boolean;
    errorPosition?: IErrorMessageProps["position"];

    onChange?(data: string): void;
}

const useStyles = makeStyles(() => ({
    errorMessage: {
        margin: "10px 0 0 0",
        display: "flex",
        alignItems: "center",
    },
    errorText: {
        paddingLeft: 10,
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
    field: {
        display: "flex",
        alignItems: "center",
        position: "relative",
    },
}));

export const Select = (props: ISelectProps) => {
    const { name, options, label, classes, disable, onChange, multiple = false } = props;
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const styles = useStyles();

    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => {
                const handleChange = (
                    event: React.ChangeEvent<{ name?: string; value: unknown }>,
                ) => {
                    if (onChange) {
                        onChange(event.target.value as string);
                    }
                    field.onChange(event);
                };
                const { value, ...restFieldProps } = field;
                return (
                    <div className={styles.field}>
                        <FormControl
                            variant={"outlined"}
                            fullWidth
                            classes={classes}
                            error={!!meta.error}
                            disabled={disable}
                        >
                            <InputLabel ref={inputLabel}>{label}</InputLabel>
                            <MaterialSelect
                                labelWidth={labelWidth}
                                multiple={multiple}
                                value={value ?? ""}
                                {...restFieldProps}
                                onChange={handleChange}
                                renderValue={(selected) =>
                                    multiple ? (
                                        <div className={styles.chips}>
                                            {(selected as string[]).map((selectedItem) => (
                                                <Chip
                                                    key={selectedItem}
                                                    label={
                                                        options.find(
                                                            (item) => item.value === selectedItem,
                                                        )?.label
                                                    }
                                                    className={styles.chip}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        options.find((item) => item.value === selected)?.label
                                    )
                                }
                            >
                                {options.map((option) => (
                                    <MenuItem value={option.value} key={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </MaterialSelect>
                        </FormControl>
                        {meta.error && meta.touched && (
                            <ErrorMessage title={meta.error} position={props.errorPosition} />
                        )}
                    </div>
                );
            }}
        </Field>
    );
};
