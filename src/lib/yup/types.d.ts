import * as yup from "yup";

declare module "yup" {
    // tslint:disable-next-line:interface-name
    interface MixedSchema<T> {
        datePicker(): yup.MixedSchema<T>;
        datePickerMin(minDate: string, message?: srting): yup.MixedSchema<T>;
        datePickerMax(maxDate: string, message?: srting): yup.MixedSchema<T>;
    }
}
