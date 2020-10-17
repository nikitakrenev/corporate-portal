import { IOption } from "components/form-fields/select";
import { ELanguages } from "entities/ELanguages";

class LanguageService {
    languageTitles = {
        [ELanguages.EN]: "Английский",
        [ELanguages.FR]: "Французский",
        [ELanguages.ES]: "Испанский",
        [ELanguages.CN]: "Китайский",
    };

    languageLevelOptions: IOption[] = [
        {
            value: "A1",
            label: "Beginner",
        },
        {
            value: "A2",
            label: "Elementary",
        },
        {
            value: "B1",
            label: "Intermediate",
        },
        {
            value: "B2",
            label: "Upper Intermediate",
        },
        {
            value: "C1",
            label: "Advanced",
        },
        {
            value: "C2",
            label: "Proficiency",
        },
    ];

    getLanguageOptions(): IOption[] {
        return Object.values(ELanguages).map((lang) => ({
            value: lang,
            label: this.languageTitles[lang],
        }));
    }
}

export const languageService = new LanguageService();
