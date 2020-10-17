import { Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "components/chip";
import { LinkWithIcon } from "components/link-with-icon";
import * as React from "react";
import { IProject } from "../../entities";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
    },
}));

interface IProjectInfoProps {
    project?: IProject;
}

export const ProjectInfo: React.FC<IProjectInfoProps> = ({ project }) => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Grid container spacing={4}>
                {/*Общая информация*/}
                <Grid item>
                    <Typography variant="h4">Общая информация</Typography>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Статус проекта
                    </Grid>
                    <Grid item xs={10}>
                        {/*В разработке*/}
                        {project?.projectStage.title}
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Приватность
                    </Grid>
                    <Grid item xs={10}>
                        Проект под NDA
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Отрасль
                    </Grid>
                    <Grid item xs={10}>
                        <Link href="#">Образование</Link>
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Описание
                    </Grid>
                    <Grid item xs={10}>
                        Универсальная платформа для сертификации специалистов.
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Платформы
                    </Grid>
                    <Grid item xs={10}>
                        <Link href="#">Web, Desktop</Link>
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Клиент
                    </Grid>
                    <Grid item xs={10}>
                        <Link href="#">
                            CompTIA Inc. Центр международной сертификации IT-специалистов
                        </Link>
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Бюджет
                    </Grid>
                    <Grid item xs={10}>
                        3,8 млрд. руб.
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Проблема клиента
                    </Grid>
                    <Grid item xs={10}>
                        Отсутствие собственного инструмента для создания и проведения экзаменов.
                    </Grid>
                </Grid>

                {/*Рабочий процесс*/}
                <Grid item>
                    <Typography variant="h4">Рабочий процесс</Typography>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Решение для клиента
                    </Grid>
                    <Grid item xs={10}>
                        Desktop App — защищенное приложение для проведения экзаменов. Web App —
                        панель управления для создания и распространения экзаменов.
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Модули решения
                    </Grid>
                    <Grid item xs={10}>
                        <Chip title={"Профиль пользователя"} />
                        <Chip title={"API, интеграции"} />
                        <Chip title={"Авторизация"} />
                        <Chip title={"Панель администратора"} />
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Стек технологий
                    </Grid>
                    <Grid item xs={10}>
                        QTI 1.2/2.2, Node.JS, Javascript, TypeScript, Electron, React/Redux, CI/CD,
                        Kubernetes, Amazon EC2/S3
                    </Grid>
                </Grid>

                {/*Результаты*/}
                <Grid item>
                    <Typography variant="h4">Результаты</Typography>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Что сделано нами
                    </Grid>
                    <Grid item xs={10}>
                        Дизайн и разработка
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Период разработки
                    </Grid>
                    <Grid item xs={10}>
                        2017 — настоящее время
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Отзыв клиента
                    </Grid>
                    <Grid item xs={10}>
                        <Typography paragraph>
                            I think your ability to deply understand business problems and address
                            those is something. I would value no matter you are — whatever you go
                            with. I wouldn’t let that go easily. That’s what really impressed me.
                        </Typography>
                        <Typography>
                            <b>Thomas Randolph Gross</b> <br />
                            CIO, CompTIA Inc., USA
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item spacing={4}>
                    <Grid item xs={2}>
                        Детали
                    </Grid>
                    <Grid item xs={10}>
                        <Typography paragraph>
                            <LinkWithIcon href={"#"}>Кейс на сайте Omega-R</LinkWithIcon>
                        </Typography>
                        <Typography paragraph>
                            <LinkWithIcon href={"#"}>App Store</LinkWithIcon>
                        </Typography>
                        <Typography paragraph>
                            <LinkWithIcon href={"#"}>Play Market</LinkWithIcon>
                        </Typography>
                        <Typography>
                            <LinkWithIcon href={"#"}>www.comptia.org/examservice</LinkWithIcon>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
