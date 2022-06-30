import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {authMeTC} from "../bll/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesList";

export const Cards = () => {
    const isLogged = useAppSelector(state => state.auth.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    },[])

    if (!isLogged) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            Cards
        </div>
    );
};
