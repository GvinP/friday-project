import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import {PATH} from "../Routes/RoutesList";
import {useAppDispatch, useAppSelector} from "../../app/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import {logoutTC} from "../../app/reducers/auth-reducer";

const setActive = (nav: { isActive: boolean }) => (nav.isActive ? s.activeLink : "")

export function Navbar() {
    const user_ID = useAppSelector(state => state.profile.user._id)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch();
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <header>
            <nav className={s.nav}>
                {!user_ID
                    ? <>
                        <div className={s.item}>
                            <NavLink to={PATH.login} className={setActive}>Login</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={PATH.registration} className={setActive}>Registration</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={PATH.passwordRecovery} className={setActive}>PasswordRecovery</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={PATH.about} className={setActive}>About</NavLink>
                        </div>
                    </>
                    : <>
                        <div className={s.item}>
                            <NavLink to={PATH.cards} className={setActive}>Cards</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={PATH.packs} className={setActive}>Packs</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to={PATH.profile} className={setActive}>Profile</NavLink>
                        </div>
                    </>}
                {user_ID && <SuperButton disabled={status} btnStyle={"primary"} onClick={logoutHandler}>Logout
                </SuperButton>}
            </nav>
        </header>
    )
}

