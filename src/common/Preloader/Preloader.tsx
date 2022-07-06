import React from "react";
import preloader from "../../assets/images/Spinner.svg";
import s from "./Preloader.module.css";


export let Preloader = () => {

    return (
        <div className={s.container}>
            <img src={preloader} alt={"preloader"}/>
        </div>
    );
};