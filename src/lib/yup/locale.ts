import { setLocale } from "yup";

setLocale({
    mixed: {
        required: "Обязательно для заполнения",
    },
    string: {
        email: "Некорректный e-mail",
    },
});
