import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "lib/yup/locale";
import "lib/yup/methods";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { JssProvider } from "components/jss-provider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Roboto, sans-serif",
        h4: {
            fontSize: 18,
            color: "#1D1F32",
        },
        body1: {
            fontSize: "inherit",
        },
    },
    palette: {
        primary: {
            main: "#0061F3",
        },
        background: {
            default: "#fff",
        },
        text: {
            primary: "#1D1F32",
            secondary: "#828496",
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <JssProvider>
                <SnackbarProvider maxSnack={5}>
                    <App />
                </SnackbarProvider>
            </JssProvider>
        </MuiPickersUtilsProvider>
    </ThemeProvider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
