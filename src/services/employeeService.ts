import { IOption } from "components/form-fields/select";
import { EEducationLevel, EEmployeeGrade, ESex } from "entities/employee";

class EmployeeService {
    getEducationLevelOptions(): IOption[] {
        return [
            {
                value: EEducationLevel.HIGHER,
                label: "Высшее",
            },
            {
                value: EEducationLevel.INCOMPLETE_HIGHER,
                label: "Не полное высшее",
            },
            {
                value: EEducationLevel.MIDDLE,
                label: "Среднее",
            },
        ];
    }

    getGradeOptions(): IOption[] {
        return Object.values(EEmployeeGrade).map((grade) => ({
            value: grade,
            label: grade,
        }));
    }

    getSexOptions(): IOption[] {
        return [
            {
                value: ESex.MALE,
                label: "Муж.",
            },
            {
                value: ESex.FEMALE,
                label: "Жен.",
            },
        ];
    }
}

export const employeeService = new EmployeeService();
