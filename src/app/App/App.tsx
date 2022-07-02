import React, {useEffect} from "react";
import "./App.css";
import s from "./App.module.css";
import {RoutesList} from "../../Navigation/Routes/RoutesList";
import {Navbar} from "../../Navigation/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../store";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import {ErrorSnackbar} from "../../common/utils/ErrorSnackbar";
import {initializeAppTC} from "../reducers/app-reducer";
import {Preloader} from "../../common/Preloader/Preloader";


function App() {
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    // if (!isInitialized) {
    //     return <Preloader/>
    // }

    return (
        <div className={s.App}>
            <Navbar/>
            <AppBar position="static">
                {status === "loading" && <LinearProgress color={'info'}/>}
            </AppBar>
            <RoutesList/>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
