import React from "react";
import {useAppSelector} from "../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../routes/RoutesList";

export const Packs = () => {
    const user_ID = useAppSelector(state => state.profile.user._id)

    if (!user_ID) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            Packs
        </div>
    );
};
