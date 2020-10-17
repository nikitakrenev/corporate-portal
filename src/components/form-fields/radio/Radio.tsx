import React from "react";
import { FormControl, FormLabel, Radio as MaterialRadio, RadioGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Field, FieldProps } from "formik";
import { IOption } from "../select";

interface ISwitchProps {
    label?: string;
    name: string;
    classes?: object;
    options: IOption[];
    convertValuesToNumber?: boolean;
}

export const Radio = (props: ISwitchProps) => {
    const { label, name, options, classes, convertValuesToNumber } = props;

    return (
        <FormControl component="fieldset" classes={classes}>
            <FormLabel component="legend">{label}</FormLabel>
            <Field name={name}>
                {({ field, form }: FieldProps) => {
                    return (
                        <RadioGroup
                            aria-label={name}
                            name={name}
                            row={true}
                            {...field}
                            value={field.value ?? ""}
                            onChange={(event) => {
                                const nextValue = convertValuesToNumber
                                    ? +event.currentTarget.value
                                    : event.currentTarget.value;
                                form.setFieldValue(name, nextValue);
                            }}
                        >
                            {options.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={item.value}
                                    control={<MaterialRadio color={"primary"} />}
                                    label={item.label}
                                />
                            ))}
                        </RadioGroup>
                    );
                }}
            </Field>
        </FormControl>
    );
};
