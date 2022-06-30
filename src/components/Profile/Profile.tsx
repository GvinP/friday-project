import React, {useRef, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {PATH} from "../../routes/RoutesList";
import userAvatar from "../../assets/images/avatar.svg"
import style from "./Profile.module.css"
import {updateNameTC} from "../../bll/reducers/profile-reducer";

export const Profile = () => {
    const {avatar, name, email} = useAppSelector(state => state.profile.user)
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<string>(name);
    const [error, setError] = useState<string>('');
    const [newPhoto, setNewPhoto] = useState('');

    const changeName = () => {
        if (newPhoto === avatar) return setError('the same photo');
        if (name === value && !newPhoto) return setError('nothing has been changed');
        dispatch(updateNameTC(value, newPhoto));
    }

    if (!name) {
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
