import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";

export const Packs = () => {

    const dispatch = useAppDispatch();

    const userName=useAppSelector<string>(store => store.profile.user.name)

    if (!userName) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            Packs
        </div>
    );
};
