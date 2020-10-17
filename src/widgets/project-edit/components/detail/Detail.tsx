import { TextField } from "components/form-fields/text-field";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Content } from "widgets/employee-edit/components/content";
import { DashedLine } from "widgets/employee-edit/components/dashed-line";
import { DashedButton } from "widgets/employee-edit/components/dashed-button";
import { FieldArray, getIn } from "formik";

interface Props {
    name: string;
}

const useStyles = makeStyles({
    field: {
        width: 480,
    },
    row: {
        display: "flex",
    },
    dashedLine: {
        marginLeft: 10,
    },
    add: {
        width: 480,
    },
});

export const Detail: React.FC<Props> = ({ name }) => {
    const styles = useStyles();

    return (
        <FieldArray
            name={name}
            render={(array) => {
                const details = getIn(array.form.values, name) ?? [];
                return (
                    <Content>
                        {details.map((item, index) => (
                            <div className={styles.row} key={index}>
                                <Content>
                                    <TextField
                                        label={"Детали"}
                                        name={`${name}.${index}`}
                                        classes={{
                                            root: styles.field,
                                        }}
                                    />
                                </Content>
                                <DashedLine
                                    className={styles.dashedLine}
                                    onClick={() => array.remove(index)}
                                />
                            </div>
                        ))}
                        <DashedButton
                            onClick={() => {
                                array.push("");
                            }}
                            className={styles.add}
                        >
                            Добавить еще
                        </DashedButton>
                    </Content>
                );
            }}
        />
    );
};
