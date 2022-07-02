import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import s from './Packs.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import EnhancedTable from "./PacksTable/PacksTable";
import {Paginator} from "./Paginator/Paginator";
import {Search} from "./Search/Search";
import {Search2} from "./Search/Search2";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {filterCardsCountAC} from "../../app/reducers/packs-reducer";

export const Packs = () => {

    const dispatch = useAppDispatch();

    const userName = useAppSelector(store => store.profile.user.name)
    const status = useAppSelector(store => store.app.status)
    const page = useAppSelector(store => store.packs.page)
    const pageCount = useAppSelector(store => store.packs.pageCount)
    const totalCount = useAppSelector(store => store.packs.cardPacksTotalCount)
    const minCards = useAppSelector(state => state.packs.min)
    const maxCards = useAppSelector(state => state.packs.max)
    const maxCardsCount = useAppSelector(store => store.packs.cardsCount.maxCardsCount)
    const minCardsCount = useAppSelector(store => store.packs.cardsCount.minCardsCount)
    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value
        dispatch(filterCardsCountAC(min, max))
    }

    if (!userName) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.main}>
            <section className={s.setting}>
                <h2>Show packs cards</h2>
                <div className={s.choose}>
                </div>
                {status
                    ? <Preloader/>
                    : <div className={s.range}>
                        <h3>Number of cards</h3>
                        <DoubleRange
                            rangeValues={[minCards as number, maxCards as number]}
                            onChangeRange={filterCardsCount}
                            min={minCardsCount}
                            max={maxCardsCount}
                        />
                    </div>}
            </section>
            <section className={s.pack}>
                <h1>PacksList</h1>
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
}

