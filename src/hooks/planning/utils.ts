import { range } from "lodash";
import moment from "moment";

const getDateOfWeek = (w: number, y: number) => {
    const d = 1 + (w - 1) * 7;
    return new Date(y, 0, d);
};

const getStartOfWeek = (index: number) => {
    return moment(getDateOfWeek(index, moment().year())).startOf("isoWeek").format("Do MMM");
};

const getEndOfWeek = (index: number) => {
    return moment(getDateOfWeek(index, moment().year())).endOf("isoWeek").format("Do MMM");
};

export const getWeekTitle = (date: number | string): string => {
    const dateObject = moment(date);
    if (!dateObject.isValid()) {
        return "";
    }
    const start = dateObject.startOf("isoWeek").format("Do MMM");
    const end = dateObject.endOf("isoWeek").format("Do MMM");
    return `${start} - ${end}`;
};

export const getWeeksTitles = (): string[] => {
    return range(moment().isoWeeksInYear()).map(
        (index) => `${getStartOfWeek(index + 1)} - ${getEndOfWeek(index + 1)}`,
    );
};

export const getStartAndEndOfWeek = (index: number): { startDate: string; endDate: string } => {
    return {
        startDate: moment(getDateOfWeek(index, moment().year()))
            .startOf("isoWeek")
            .utcOffset(0, true)
            .toISOString(),
        endDate: moment(getDateOfWeek(index, moment().year()))
            .endOf("isoWeek")
            .utcOffset(0, true)
            .toISOString(),
    };
};
