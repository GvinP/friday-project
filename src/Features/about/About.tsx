import {NavLink, Outlet, useNavigate} from "react-router-dom";
import style from "../../app/App/App.module.css";
import s from "./Aboute.module.css";
import React from "react";
import SuperButton from "../../common/SuperButton/SuperButton";


export const About = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div className={style.smallContainer}>
            <h1>Cards</h1>
            <h2>About us</h2>
            <ul>
                <li className={s.item}><NavLink to="contacts"
                                                className={({isActive}) => (isActive ? s.activeLink : "")}>
                    Contacts</NavLink></li>
                <li className={s.item}><NavLink to="team" className={({isActive}) => (isActive ? s.activeLink : "")}>Our
                    Team</NavLink></li>
            </ul>
            <SuperButton onClick={goBack}>Go back</SuperButton>
            <Outlet/>
        </div>
    );

};