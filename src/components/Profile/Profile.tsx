import React from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import {PATH} from "../../routes/RoutesList";
import userAvatar from "../../assets/images/avatar.svg"
import style from "./Profile.module.css"

export const Profile = () => {
    const user_ID = useAppSelector(state => state.profile.user._id)
    const {avatar, name, email} = useAppSelector(state => state.profile.user)

    if (!user_ID) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div className={style.container}>
            <div className={style.profileContainer}>
                <div className={style.profile}>
                    <img src={avatar ? avatar : userAvatar} alt='profilePhoto' className={style.avatar}/>
                    <span className={style.name}>{name}</span>
                    <span className={style.email}>{email}</span>
                </div>
                <div className={style.cardsRange}>
                    Number of cards
                </div>
            </div>
            <div className={style.packsList}>
                Packs list {name}'s
            </div>
        </div>
    )
};
