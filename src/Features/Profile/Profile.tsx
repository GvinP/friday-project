import React, {useRef, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {PATH} from "../../Navigation/Routes/RoutesList";
import style from "./Profile.module.css"
import {ReactComponent as DefaultAva} from '../../assets/images/avatar.svg';
import {ReactComponent as UploadAva} from '../../assets/images/add_photo.svg';
import {ChangesInputs} from "./ChangesInputs";
import SuperButton from "../../common/SuperButton/SuperButton";
import {updateNameTC} from "../../app/reducers/profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";
import s from "../Packs/Packs.module.css";
import {Search} from "../Packs/Search/Search";
import {Search2} from "../Packs/Search/Search2";
import EnhancedTable from "../Packs/PacksTable/PacksTable";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {filterCardsCountAC} from "../../app/reducers/packs-reducer";


export const Profile = () => {
    const {avatar, name, email} = useAppSelector(state => state.profile.user)
    const status = useAppSelector(state => state.app.status)
    const minCards = useAppSelector(state => state.packs.min)
    const maxCards = useAppSelector(state => state.packs.max)
    const maxCardsCount = useAppSelector(store => store.packs.cardsCount.maxCardsCount)
    const minCardsCount = useAppSelector(store => store.packs.cardsCount.minCardsCount)
    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value
        dispatch(filterCardsCountAC(min, max))
    }

    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const [value, setValue] = useState<string>(name)
    const [error, setError] = useState<string>('')
    const [newPhoto, setNewPhoto] = useState('')

    const changeName = () => {
        if (newPhoto === avatar) return setError('the same photo')
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
                        <EditableSpan value={value} onChange={setValue}
                        />
                    </span>

                    <span className={style.infoSpan}>Email</span>
                    <span className={style.email}>{email}</span>
                    <div className={style.profileError}>
                        {error}
                    </div>
                    <SuperButton disabled={status === 'loading'} btnStyle={"primary"}
                                 onClick={changeName}>Save</SuperButton>
                </div>

                <div className={style.cardsRange}>
                    <div>
                        <h3> Number of cards</h3>
                    </div>

                    <div>
                        <DoubleRange
                            rangeValues={[minCards as number, maxCards as number]}
                            onChangeRange={filterCardsCount}
                            min={minCardsCount}
                            max={maxCardsCount}
                        />
                    </div>

                </div>

            </div>
            <section className={s.pack}>
                <h1>{value}'s Packs list</h1>
                <div className={s.search}>
                    <Search/>
                </div>
                <div className={s.search}>
                    <Search2/>
                </div>
                <EnhancedTable/>
                {/*<Paginator />*/}
            </section>
        </div>
    )
};
