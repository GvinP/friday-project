import React, {useRef, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {PATH} from "../../routes/RoutesList";
import style from "./Profile.module.css"
import {ReactComponent as DefaultAva} from '../../assets/images/avatar.svg';
import {ReactComponent as UploadAva} from '../../assets/images/add_photo.svg';
import {ChangesInputs} from "./ChangesInputs";
import SuperButton from "../../common/SuperButton/SuperButton";
import {updateNameTC} from "../../bll/reducers/profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";


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

            <ChangesInputs error={error}
                           setError={setError}
                           setNewPhoto={setNewPhoto}
                           inputRef={inputRef}/>
            <div className={style.profileContainer}>
                <div className={style.profile}>
                    <div className={style.profileAva}>
                        {!avatar && !newPhoto
                            ? <DefaultAva className={style.defaultAva}/>
                            : <img className={style.defaultAva} src={newPhoto ? newPhoto : avatar} alt="user-ava"/>}
                        <UploadAva className={style.editPhoto}
                                   onClick={() => inputRef && inputRef.current && inputRef.current.click()}/>
                    </div>
                    <span className={style.infoSpan}>Nickname</span>
                    <span className={style.email}>
                        <EditableSpan value={value}  onChange={setValue}
                        />
                    </span>

                    <span className={style.infoSpan}>Email</span>
                    <span className={style.email}>{email}</span>
                    <div className={style.profileError}>
                        {error}
                    </div>
                    <SuperButton disabled={status === 'loading'} btnStyle={"primary"} onClick={changeName}>Save</SuperButton>
                </div>
                <div className={style.cardsRange}>
                    Number of cards
                </div>
            </div>
            <div className={style.packsList}>
                {value}'s Packs list
            </div>
        </div>
    )
};