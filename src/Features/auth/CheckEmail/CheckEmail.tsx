import React from "react";
import style from "../../../app/App/App.module.css";
import st from "./CheckEmail.module.css";
import {useAppSelector} from "../../../app/store";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import close from "../../../assets/icons/close.png";


export const CheckEmail = () => {
    const email = useAppSelector(state => state.registrationManage.passwordRecovery.email);

    return <div className={style.smallContainer}>
        <h1>Cards</h1>
        <div className={st.img}></div>
        <h2>Check Email</h2>
        <div className={st.text}>
            <span style={{color: "gray", margin: "10px"}}>{`We've sent an Email with instructions to ${email}`}</span>
        </div>
    </div>;
};
