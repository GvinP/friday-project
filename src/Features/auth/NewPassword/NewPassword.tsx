import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../../Navigation/Routes/RoutesList";
import style from "../../../app/App/App.module.css";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {setNewPassSuccessAC, setNewPassTC} from "../../../app/reducers/newPassword-reducer";
import {setAppErrorAC} from "../../../app/reducers/app-reducer";
import {InputPassword} from "../../../common/InputPassword/InputPassword";
import FormControl from "@mui/material/FormControl";


export const NewPassword = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState("");
    const status = useAppSelector(state => state.app.status);
    const info = useAppSelector(state => state.registrationManage.newPassword.success);
    const error = useAppSelector(state => state.registrationManage.newPassword.error);
    const token = useParams().token;
    useEffect(() => {
        return () => {
            dispatch(setNewPassSuccessAC(false));
            dispatch(setAppErrorAC(null));
        };
    }, [dispatch]);

    if (info) {
        return <Navigate to={PATH.login}/>;
    }
    return <div className={style.smallContainer}>
        <h1>Cards</h1>
        <h2>Create new password</h2>
        <div className={style.formContainer}>
            <FormControl>
                <InputPassword
                    value={password}
                    onChangeText={setPassword}
                    placeholder={"Password"}
                />
                <div style={{color: "gray", margin: "10px"}}>Create new password and we will send you further
                    instructions
                    to email
                </div>
                <SuperButton disabled={status} onClick={() => {
                    if (token) {
                        dispatch(setNewPassTC(password, token));
                    }
                }}>Create new password</SuperButton>
                {error && <p style={{color: "red"}}>{error}</p>}
            </FormControl>
        </div>
    </div>;
};
