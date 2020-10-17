import React from "react";
import { TitleWrapper } from "../../components/title-wrapper";
import { EmployeeProject } from "../employee-project";
import { EmployeeCourse } from "../employee-course";
import { EmployeePublication } from "../employee-publication";
import { EmployeeEvent } from "../employee-event";
import { styles } from "./styles";
import { Link } from "react-router-dom";
import { TEmployeeProfileTab, EEmployeeEditKey, IEmployee } from "../../entities";
import { Chip } from "../../components/chip";

interface Props {
    employee?: IEmployee;
    tab?: TEmployeeProfileTab;
    employeeId: number;
}

export const EmployeeData = (props: Props) => {
    const { employee, employeeId, tab = "main" } = props;
    const classes = styles();

    return (
        <>
            {tab === "main" && (
                <div className={classes.employeeProfile}>
                    <div className={classes.employeePositionTitle}>
                        <p className={classes.employeePosition}>{employee?.position.title}</p>
                        <div className={classes.employeeDegree}>
                            <span>{employee?.rank?.title}</span>
                        </div>
                        <Link
                            className={classes.employeeEdit}
                            to={`/staff/${employeeId}/edit/${EEmployeeEditKey.POSITION}`}
                        >
                            Редактировать
                        </Link>
                    </div>
                    <p className={classes.employeePositionText}>
                        Отдел: {employee?.department.title}
                    </p>
                    <p className={classes.employeePositionText}>
                        Руководитель: <Link to="">{employee?.leader.title}</Link>
                    </p>
                    <TitleWrapper
                        title={"Образование"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.EDUCATION}`}
                    >
                        {employee?.education.map((item, index) => (
                            <div key={index}>
                                <p className={classes.employeeUniversity}>{item.name}</p>
                                <span className={classes.employeeText}>{item.faculty}</span>
                                <span className={classes.employeeText}>{item.speciality}</span>
                            </div>
                        ))}
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Опыт работы"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.EXPERIENCE}`}
                    >
                        <p className={classes.employeeText}>{employee?.experience}</p>
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Знание языков"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.LANGUAGES}`}
                    >
                        {employee?.languages.map((item, index) => (
                            <div className={classes.employeeText} key={index}>
                                <span>{item.title}</span>
                                <span> - </span>
                                <span>{item.level}</span>
                            </div>
                        ))}
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Навыки"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.SKILLS}`}
                    >
                        <div className={classes.employeeSkills}>
                            {employee?.skills.map((item, index) => (
                                <Chip title={item} key={index} />
                            ))}
                        </div>
                        <div className={classes.employeePersonalSkills}>
                            <ul>
                                {employee?.personalQualities.map((item, index) => (
                                    <li className={classes.employeePersonalSkill} key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Проекты"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.PROJECTS}`}
                    >
                        {employee?.projects &&
                            employee?.projects.map((item, index) => (
                                <EmployeeProject project={item} key={index} />
                            ))}
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Курсы"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.COURSES}`}
                    >
                        {employee?.courses &&
                            employee?.courses.map((item, index) => (
                                <EmployeeCourse course={item} key={index} />
                            ))}
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Публикации"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.PUBLICATIONS}`}
                    >
                        {employee?.publications &&
                            employee?.publications.map((item, index) => (
                                <EmployeePublication publication={item} key={index} />
                            ))}
                    </TitleWrapper>
                    <TitleWrapper
                        title={"Мероприятия"}
                        route={`/staff/${employeeId}/edit/${EEmployeeEditKey.EVENTS}`}
                    >
                        {employee?.events &&
                            employee?.events.map((item, index) => (
                                <EmployeeEvent event={item} key={index} />
                            ))}
                    </TitleWrapper>
                </div>
            )}
            {tab === "vacation" && <h1>Vacation</h1>}
        </>
    );
};
