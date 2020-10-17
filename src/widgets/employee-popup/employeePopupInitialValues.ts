import { ESex, ICreateEmployee } from "entities/employee";
import { minBirthdayDate } from "utils/birthdayValidation";

export const employeePopupInitialValues: ICreateEmployee = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    sex: ESex.MALE,
    birthday: minBirthdayDate,
};
