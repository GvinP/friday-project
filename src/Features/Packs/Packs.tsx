import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import s from './Packs.module.css'

export const Packs = () => {

    const dispatch = useAppDispatch();

    const userName = useAppSelector(store => store.profile.user.name)
    const status = useAppSelector(store => store.app.status)
    const page = useAppSelector(store => store.packs.page)
    const pageCount = useAppSelector(store => store.packs.pageCount)
    const totalCount = useAppSelector(store => store.packs.cardPacksTotalCount)


    if (!userName) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.main}>
            <section className={s.setting}>
                <h2>Show packs cards</h2>
            </section>
        </div>
    )
}

