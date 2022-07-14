import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App/App";
import reportWebVitals from "./reportWebVitals";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/store";
import {createTheme} from "@mui/material";


const darkTheme = createTheme({
    palette: {
        text: {
            primary:"#78acdc",
            secondary: "#a7c4cd",
        },
        primary: {
            main: "#c1cfd4",
            contrastText: "#090606",
            dark: "white",
        },
        secondary: {
            main: "#822f4d",
            contrastText: "#2f2f2f",
            dark: "white",
        },
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        text: {
            primary:"#044471",
            secondary: "#767676",
        },
        primary: {
            main: "#206c7f",
            contrastText: "#873f3f",
            dark: "black",
        },
        secondary: {
            main: "#54a4e1",
            contrastText: "rgba(59,108,173,0.8)",
            dark: "black",
        },
        mode: "light"
    }
});

const themes = [lightTheme, darkTheme];

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App themes={themes}/>
        </Provider>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
