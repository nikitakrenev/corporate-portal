import moment from "moment";
import * as Yup from "yup";

export const maxBirthdayDate = moment().subtract(18, "years").format();
export const minBirthdayDate = moment().subtract(100, "years").format();
export const birthdayValidation = Yup.mixed()
    .required()
    .datePickerMin(minBirthdayDate, "Сотрудники не должны быть старше 80 лет")
    .datePickerMax(maxBirthdayDate, "Сотрудники должны быть старше 18 лет")
    .datePicker();
