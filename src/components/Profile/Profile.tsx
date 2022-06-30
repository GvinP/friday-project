import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {authMeTC} from "../bll/reducers/auth-reducer";
import {PATH} from "../routes/RoutesList";
import userAvatar from "../assets/images/avatar.svg"

export const Profile = () => {
    const isLogged = useAppSelector(state => state.auth.auth)
    const {avatar, name, email} = useAppSelector(state => state.profile.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    },[])

    if (!isLogged) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div>
            <div>
                <div>
                    <h3>PROFILE</h3>
                    <div>
                        <img src={avatar ? avatar : userAvatar} alt='profilePhoto' style={{width: 50}}/>
                    </div>
                    <div>
                        <span>Name
                            : {name}
                        </span>
                    </div>
                    <div>
                        <span>Email:
                            {email}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};
