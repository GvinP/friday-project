import React from "react";
import {useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";

export const Cards = () => {
    const user_ID = useAppSelector(state => state.profile.user._id)

    if (!user_ID) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            Cards
        </div>
    );
};
