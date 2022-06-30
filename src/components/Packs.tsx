import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesList";
import {authMeTC} from "../bll/reducers/auth-reducer";

export const Packs = () => {
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
            Packs
        </div>
    );
};
