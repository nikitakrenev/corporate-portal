import { DatePickerProps } from "@material-ui/pickers/DatePicker/DatePicker";
import { ErrorMessage, IErrorMessageProps } from "components/form-fields/error-message";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Field, FieldProps, useFormikContext } from "formik";

interface Props extends Omit<DatePickerProps, "value" | "onChange"> {
    name: string;
    label?: string;
    date?: string;
    classes?: object;
    errorPosition?: IErrorMessageProps["position"];
}

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        position: "relative",
    },
}));

export const DateField = (props: Props) => {
    const { name, label, classes, errorPosition, ...restProps } = props;
    const { setFieldValue } = useFormikContext();
    const styles = useStyles();

    const handleDateChange = (date: Date | string | null) => {
        setFieldValue(name, date);
    };

    return (
        <Field name={name}>
            {({ field, meta, form }: FieldProps) => {
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className={styles.wrapper}>
                            <KeyboardDatePicker
                                allowKeyboardControl={false}
                                label={label}
                                format="dd/MM/yyyy"
                                value={field.value}
                                error={!!meta.error && meta.touched}
                                onChange={handleDateChange}
                                inputVariant="outlined"
                                variant="inline"
                                InputProps={{
                                    classes,
                                }}
                                onBlur={() => {
                                    form.setFieldTouched(name, true, true);
                                }}
                                helperText={null}
                                {...restProps}
                            />
                            {meta.error && meta.touched && (
                                <ErrorMessage title={meta.error} position={errorPosition} />
                            )}
                        </div>
                    </MuiPickersUtilsProvider>
                );
            }}
        </Field>
    );
};
