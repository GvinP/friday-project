import React from "react";
import "./App.css";
import s from "./App.module.css";
import {RoutesList} from "./routes/RoutesList";
import {Navbar} from "./Navbar/Navbar";
import {useAppSelector} from "./bll/store";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";

import {ErrorSnackbar} from "./common/utils/ErrorSnackbar";

function App() {
    const status = useAppSelector((state) => state.app.status);
    // const isInitialized = useAppSelector((state) => state.app.isInitialized);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(initializeAppTC());
    // }, []);
    //
    // if (!isInitialized) {
    //     return <Preloader/>;
    // }

    return (
        <div className={s.App}>
            <AppBar position="static">
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Navbar/>
            <RoutesList/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
