import React from "react";
import {Route, Routes} from "react-router-dom";
import {Login} from "../auth/Login/Login";
import {Registration} from "../auth/Registration/Registration";
import {Profile} from "../components/Profile";
import {PasswordRecovery} from "../auth/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "../auth/NewPassword/NewPassword";
import {About} from "../components/about/About";
import {Error404} from "./Error/Error404";
import {Packs} from "../components/Packs";
import {Cards} from "../components/Cards";
import {CheckEmail} from "../auth/CheckEmail/CheckEmail";


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
    cards: "/cards",
    checkEmail: "/check-email"
};

export const RoutesList = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.checkEmail} element={<CheckEmail/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={PATH.newPassword} element={<NewPassword/>}/>
                <Route path={PATH.packs} element={<Packs/>}/>
                <Route path={PATH.cards} element={<Cards/>}/>
                <Route path={PATH.about} element={<About/>}>
                    <Route path="contacts" element={<p>Our contact</p>}/>
                    <Route path="team" element={<p>Our team</p>}/>
                </Route>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    );
};