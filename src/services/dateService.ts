import moment from "moment";

class DateService {
    /**
     * @param date - Дата в формате ISO
     * @return Дата в формате ГГГГ-ММ-ДД
     */
    toSeverFormat(date: string): string {
        return moment(date).format("YYYY-MM-DD");
    }
}

export const dateService = new DateService();
