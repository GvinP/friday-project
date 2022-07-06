import React, {useEffect, useState} from "react";
import "./App.css";
import s from "./App.module.css";
import {RoutesList} from "../../Navigation/Routes/RoutesList";
import {Navbar} from "../../Navigation/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../store";
import {LinearProgress, Paper, Switch, ThemeProvider} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {ErrorSnackbar} from "../../common/utils/ErrorSnackbar";
import {initializeAppTC} from "../reducers/app-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type AppPropsType = {
    themes: object[]
}

const App = React.memo((props: AppPropsType) => {
    const [darkMode, setDarkMode] = useState(false);
    const status = useAppSelector((state) => state.app.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("render initialized");
        dispatch(initializeAppTC());
    }, [ dispatch]);

    if (status) {
        return <Preloader/>;
    }

    return (
        <ThemeProvider theme={darkMode ? props.themes[1] : props.themes[0]}>
            {status && <LinearProgress/>}
            <Paper
                style={{backgroundImage: darkMode ? "linear-gradient(0deg,   #3c5369 30%, black )" : "linear-gradient(0deg, #c0d2e2 0%, #3e597c 100%)"}}>
                <Navbar/>
                <AppBar position="static">
                    {status && <LinearProgress color={"info"}/>}
                </AppBar>
                <RoutesList/>
                <ErrorSnackbar/>
                <div className={s.changeTheme}><Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>Switch
                    Mode
                </div>
            </Paper>
        </ThemeProvider>
    );
});

export default App;
