import { SnackbarMessage, useSnackbar } from "notistack";

export const useNotifications = () => {
    const { enqueueSnackbar } = useSnackbar();

    const notifySuccess = (message: SnackbarMessage): void => {
        enqueueSnackbar(message, {
            variant: "success",
        });
    };

    const notifyError = (message: SnackbarMessage): void => {
        enqueueSnackbar(message, {
            variant: "error",
        });
    };

    const notifyInfo = (message: SnackbarMessage): void => {
        enqueueSnackbar(message, {
            variant: "info",
        });
    };

    return {
        notifySuccess,
        notifyError,
        notifyInfo,
    };
};
