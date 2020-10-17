const natashaRybakova = require("../img/natasha_rybakova.png");
const alexandrZolotih = require("../img/alexandr_zolotih.png");
const konstantinIvanov = require("../img/konstantin_ivanov.png");
const maksimSkvorcov = require("../img/maksim_skvorcov.png");
const romanAbramov = require("../img/roman_abramov.png");
const sergeyJuravlev = require("../img/sergey_juravlev.png");
const tatyanaTcepeleva = require("../img/tatyana_tcepeleva.png");

interface IProjectTeamItem {
    name: string;
    position: string;
    avatar: string;
}
export const projectTeamManagerData: IProjectTeamItem = {
    name: "Наталья Рыбакова",
    position: "Project Manager",
    avatar: natashaRybakova,
};

export const projectTeamData: IProjectTeamItem[] = [
    {
        name: "Сергей Журавлев",
        position: "Senior Backend Developer",
        avatar: sergeyJuravlev,
    },
    {
        name: "Роман Абрамов",
        position: "Backend Developer",
        avatar: romanAbramov,
    },
    {
        name: "Максим Скворцов",
        position: "Senior UX/UI Designer",
        avatar: maksimSkvorcov,
    },
    {
        name: "Константиин Иванов",
        position: "UX/UI Designer",
        avatar: konstantinIvanov,
    },
    {
        name: "Александр Золотых",
        position: "Senior Web Developer",
        avatar: alexandrZolotih,
    },
    {
        name: "Татьяна Цепелева",
        position: "Web Developer",
        avatar: tatyanaTcepeleva,
    },
];
