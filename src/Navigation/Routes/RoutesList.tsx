import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../Features/auth/Login/Login";
import {Registration} from "../../Features/auth/Registration/Registration";
import {Profile} from "../../Features/Profile/Profile";
import {PasswordRecovery} from "../../Features/auth/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "../../Features/auth/NewPassword/NewPassword";
import {About} from "../../Features/about/About";

import {Packs} from "../../Features/Packs/Packs";
import {CheckEmail} from "../../Features/auth/CheckEmail/CheckEmail";
import {Error404} from "./Error/Error404";
import {Cards} from "../../Features/Cards/Cards";
import {LearnPageContainer} from "../../Features/learn/LearnPageContainer";


export const PATH = {
    login: "/login",
    registration: "/registration",
    profile: "/profile",
    newPassword: "/set-new-password/:token",
    passwordRecovery: "/password-recovery",
    componentsDemo: "/components-demo",
    error404: "/error404",
    about: "/about",
    home: "/home",
    packs: "/packs",
    cards: "/cards/:cardsPack_id",
    checkEmail: "/check-email",
    learn: "/learn/",
};

export const RoutesList = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate to={PATH.login}/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.checkEmail} element={<CheckEmail/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={PATH.newPassword} element={<NewPassword/>}/>
                <Route path={PATH.packs} element={<Packs/>}/>
                <Route path={PATH.cards} element={<Cards/>}/>
                <Route path={PATH.learn + ":cardPackID"} element={<LearnPageContainer/>}/>
                <Route path={PATH.about} element={<About/>}>
                    <Route path="contacts" element={<p>Our contact</p>}/>
                    <Route path="team" element={<p>Our team</p>}/>
                </Route>
                <Route path="*" element={<Error404/>}/>
            </Routes>
    )
}