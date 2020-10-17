import * as React from "react";
import { useState } from "react";
import { Field, FieldProps, FieldValidator } from "formik";
import { TextField as MaterialTextField, InputLabelProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage, IErrorMessageProps } from "../error-message";
import cn from "classnames";
import { get } from "lodash";

interface ITextFieldProps {
    name: string;
    InputLabelProps?: InputLabelProps;
    label?: string;
    error?: boolean;
    classes?: object;
    type?: string;
    size?: "small" | "medium";
    textarea?: boolean;
    validate?: FieldValidator;
    disable?: boolean;
    errorPosition?: IErrorMessageProps["position"];
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
    field: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&._focused": {
            zIndex: 1,
        },
    },
    inputBase: {
        "$field._focused &": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
        },
    },
    inputWrapper: {
        position: "relative",
    },
    input: {
        margin: 0,
    },
    multiline: {
        minHeight: 74,
    },
}));

export const TextField = (props: ITextFieldProps) => {
    const {
        name,
        label,
        error,
        classes,
        type = "text",
        size,
        InputLabelProps,
        textarea = false,
        validate,
        disable,
    } = props;
    const styles = useStyles();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Field name={name} validate={validate}>
            {({ field, meta }: FieldProps) => (
                <div
                    className={cn(styles.field, {
                        _focused: isFocused,
                    })}
                >
                    <MaterialTextField
                        variant="outlined"
                        fullWidth
                        label={label}
                        type={type}
                        error={(meta.error && meta.touched) || error}
                        size={size}
                        InputLabelProps={{
                            ...InputLabelProps,
                            shrink: !!field.value,
                        }}
                        multiline={textarea}
                        inputProps={{
                            className: cn({
                                [styles.multiline]: textarea,
                            }),
                        }}
                        disabled={disable}
                        FormHelperTextProps={{
                            classes: { root: styles.errorMessage },
                        }}
                        classes={{
                            ...classes,
                            root: cn(styles.input, get(classes, "root")),
                        }}
                        InputProps={{
                            className: styles.inputBase,
                        }}
                        margin="normal"
                        {...field}
                        value={field.value ?? ""}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            field.onBlur(e);
                            setIsFocused(false);
                        }}
                    />
                    {meta.error && meta.touched && (
                        <ErrorMessage title={meta.error} position={props.errorPosition} />
                    )}
                </div>
            )}
        </Field>
    );
};
