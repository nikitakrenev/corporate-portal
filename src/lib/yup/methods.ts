import * as yup from "yup";
import { Schema } from "yup";
import moment from "moment";

// tslint:disable-next-line:no-any
yup.addMethod(yup.mixed, "datePicker", function (): Schema<any> {
    return this.test("datePicker", "Некорректная дата", (value?: Date | string) => {
        const date = new Date(value);
        return !value || !!date.getTime();
    });
});

// tslint:disable-next-line:no-any
yup.addMethod(yup.mixed, "datePickerMin", function (
    minDateString: string,
    message?: string,
): Schema<any> {
    return this.test(
        "datePickerMin",
        message ?? `Дата должна быть больше ${moment(minDateString).format("DD/MM/YYYY")}`,
        (value?: Date | string) => {
            const date = new Date(value);
            const minDate = new Date(minDateString);
            if (!minDate.getTime()) {
                throw new Error(`Validate parameter ${minDate} is not valid parsed date string`);
            }
            return !value || !date.getTime() ? true : minDate.getTime() < date.getTime();
        },
    );
});

// tslint:disable-next-line:no-any
yup.addMethod(yup.mixed, "datePickerMax", function (
    maxDateString: string,
    message?: string,
): Schema<any> {
    return this.test(
        "datePickerMin",
        message ?? `Дата должна быть меньше ${moment(maxDateString).format("DD/MM/YYYY")}`,
        (value?: Date | string) => {
            const date = new Date(value);
            const maxDate = new Date(maxDateString);
            if (!maxDate.getTime()) {
                throw new Error(`Validate parameter ${maxDate} is not valid parsed date string`);
            }
            return !value || !date.getTime() ? true : maxDate.getTime() > date.getTime();
        },
    );
});
