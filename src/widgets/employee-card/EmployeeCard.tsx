import React from "react";
import { styles } from "./styles";
import { EEmployeeEditKey, IEmployee, TEmployeeProfileTab } from "entities/employee";
import cn from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";

interface IEmployeeCardProps {
    employee?: IEmployee;
    tab?: TEmployeeProfileTab;
    employeeId: number;

    onSwitchTab?(tab: TEmployeeProfileTab): void;
}

const IMAGE = require("./image.png");

export const EmployeeCard = (props: IEmployeeCardProps) => {
    const { employee, onSwitchTab, tab = "main", employeeId } = props;
    const classes = styles();

    const getAge = () => {
        const today = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
        );
        const birthday = new Date(employee?.birthday);
        const birthdayThisYear = new Date(
            today.getFullYear(),
            birthday.getMonth(),
            birthday.getDate(),
        );

        return today < birthdayThisYear
            ? today.getFullYear() - birthday.getFullYear() - 1
            : today.getFullYear() - birthday.getFullYear();
    };

    const handleSwitch = (tab: TEmployeeProfileTab) => {
        if (onSwitchTab) {
            onSwitchTab(tab);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.employeeCard}>
                <img className={classes.employeeImage} src={IMAGE} alt="Employee" />
                <div>
                    <p className={classes.employeeName}>
                        {employee?.lastName} {employee?.firstName} {employee?.middleName}
                    </p>
                    <div className={classes.employeeCardPart}>
                        <p className={classes.employeeInfo}>
                            {employee?.sex.title}, {getAge()}
                        </p>
                        <p className={classes.employeeInfo}>
                            Дата рождения: {moment(employee?.birthday).format("DD.MM.YYYY")}
                        </p>
                        <Link
                            className={classes.employeeEdit}
                            to={`/staff/${employeeId}/edit/${EEmployeeEditKey.MAIN}`}
                        >
                            Редактировать
                        </Link>
                    </div>
                    <div className={classes.employeeCardPart}>
                        <p className={classes.employeeInfo}>{employee?.phone}</p>
                        <p className={classes.employeeInfo}>{employee?.email}</p>
                        <Link
                            className={classes.employeeEdit}
                            to={`/staff/${employeeId}/edit/${EEmployeeEditKey.CONTACTS}`}
                        >
                            Редактировать
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classes.employeeTabs}>
                <div
                    className={cn(classes.employeeTab, tab === "main" && classes.activeTab)}
                    onClick={() => handleSwitch("main")}
                >
                    <span className={classes.employeeTabText}>Основная информация</span>
                </div>
                <div
                    className={cn(classes.employeeTab, tab === "vacation" && classes.activeTab)}
                    onClick={() => handleSwitch("vacation")}
                >
                    <span className={classes.employeeTabText}>Отпуск</span>
                </div>
            </div>
        </div>
    );
};
