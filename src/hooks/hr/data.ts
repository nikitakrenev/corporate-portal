import { ELanguages } from "entities/ELanguages";
import { IEmployeeLang } from "../../entities";

export const lang: IEmployeeLang[] = [
    {
        id: 0,
        title: ELanguages.EN,
        level: "C1",
    },
];

export const skills = [
    "Java",
    "Android Studio",
    "Objective C",
    "C++",
    "С",
    "SQL",
    "C#",
    "Android SDK",
    "Material Design",
    "GMS",
    "Multi-threading",
    "cocos2d-x",
    "Boost",
    "STL",
    "SOAP",
    "JSON",
    "JSON",
    "REST",
    "SCRUM",
    "ORM",
    "GIT",
    "JIRA",
    "Target Process",
    "Kotlin",
    "Swift",
    "Flutter/Dart",
];

export const personalSkills = [
    "Управление проектами и продуктами",
    "Креативное мышление",
    "Фасилитация встреч, брейнштормов, критики",
    "Аналитическое мышление",
];

export const projects = [
    {
        year: "2019",
        name: "Магнит. Опросный лист",
        position: "Senior android developer",
        description:
            "Создан конструктор опросов, при помощи которого департамент строительства может собирать данные о необходимых ресурсах для открытия новых магазинов сети «Магнит».Значительно сокращена «бюрократия» в вопросах сбора информации",
        technologies: "Retrofit, Glide",
    },
    {
        year: "2019",
        name: "Dexen",
        position: "Senior android developer",
        description:
            "The app works as an IOT gateway to collect data from Dexen’s wireless sensors and transmit the data over to a cloud server.",
        technologies: "Android SDK, ORMLite, iBeacon technology",
    },
    {
        year: "2019",
        name: "Motor World Car Factory",
        position: "Senior Cocos 2d-x developer",
        description: "Citybuilder game with over 3M installs, DAU - over 100k",
        technologies:
            "Porting from iOS to Android, Cocos 2d-x, Amazon S3, Facebook, Mobage, Crittercism ",
    },
];

export const courses = [
    {
        year: "2019",
        name: "Skillbox",
        description: "Профессия Python-разработчик",
    },
    {
        year: "2019",
        name: "Skillbox",
        description: "Веб-разработчик PRO",
    },
];

export const publications = [
    {
        year: "2019",
        name: "vc.ru",
        description: "32 отличия дизайна мобильного приложения под iOS и Android",
    },
    {
        year: "2019",
        name: "Medium",
        description: "Effective Java for Android",
    },
];

export const events = [
    {
        year: "2019",
        name: "Конференция разработчиков мобильных приложений",
        role: {
            id: 1,
            title: "Участник",
        },
        theme: "",
    },
    {
        year: "2019",
        name: "PROFSOUX 2020",
        role: {
            id: 2,
            title: "Спикер",
        },
        theme: "Тема выступления: тренды android разработки",
    },
];

export const mainInfo = {
    firstName: "Дмитрий",
    secondName: "Валериевич",
    surname: "Иванов",
    gender: "Мужчина",
    age: "31 год",
    birth: "12 августа 1989",
    phone: "+7 (903) 358 49-95",
    email: "ivanov.dmitriy@omega-r.com",
    experience: "5 лет",
    skills: skills,
    personalSkills: personalSkills,
};

export const position = {
    position: "Android developer",
    degree: "Senior",
    department: "android разработка",
    superior: "Александр Васильев",
};

export const education = [
    {
        id: 1,
        name:
            "Санкт-Петербургский государственный университет телекомменикаций им. проф. М. А. Бонч-Бруевича (СПбГУТ)",
        level: "high",
        faculty: "Сети связи и системы коммутации.",
        speciality:
            "Разработка программного обеспечения для компьютеров и компьютерных систем, 2010– 2015",
        year: "",
    },
];
