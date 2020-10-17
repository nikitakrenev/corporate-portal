import { makeStyles } from "@material-ui/core";
export const styles = makeStyles({
    wrapper: {
        margin: "40px",
    },
    title: {
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "24px",
        color: "#1D1F32",
    },
    addButton: {
        cursor: "pointer",
        padding: "13px 16px",
        textAlign: "center",
        border: "1px dashed #828496",
        boxSizing: "border-box",
        borderRadius: 4,
    },
    addButtonText: {
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "16px",
        color: "#828496",
    },
    delButton: {
        width: 9,
        height: 9,
        "&:hover": {
            cursor: "pointer",
            background: "url(./close_hover.png)",
        },
    },
});
