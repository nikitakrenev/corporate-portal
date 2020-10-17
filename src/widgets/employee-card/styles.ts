import { makeStyles } from "@material-ui/core";

export const styles = makeStyles({
    wrapper: {
        padding: "40px 40px 0 40px",
        background: "#F9F9F9",
        borderTop: "1px solid #CECED1",
        borderBottom: "1px solid #CECED1",
    },
    employeeCard: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    employeeImage: {
        marginRight: "24px",
        width: "189px",
        height: "189px",
        borderRadius: "4px",
    },
    employeeName: {
        margin: "0 0 12px 0",
        fontSize: "24px",
        lineHeight: "28px",
        fontFamily: "Roboto, sans-serif",
        color: "#1D1F32",
    },
    employeeCardPart: {
        marginTop: "13px",
    },
    employeeInfo: {
        margin: "0 0 6px 0",
        fontSize: "14px",
        lineHeight: "16px",
        fontFamily: "Roboto, sans-serif",
        color: "#4A4C5B",
    },
    employeeEdit: {
        display: "block",
        margin: "8px 0 0 0",
        textDecoration: "none",
        fontFamily: "Roboto, sans-serif",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#0061F3",
    },
    employeeTabs: {
        display: "flex",
        marginTop: "32px",
    },
    employeeTab: {
        padding: "18px 24px",
        "&:hover": {
            cursor: "pointer",
        },
    },
    employeeTabText: {
        fontSize: "14px",
        lineHeight: "20px",
        fontFamily: "Roboto, sans-serif",
    },
    activeTab: {
        color: "#0061F3",
        borderBottom: "2px solid #0061F3",
    },
});
