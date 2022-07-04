import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import s from './Packs.module.css'
import SuperButton from "../../common/SuperButton/SuperButton";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {
    filterCardsCountAC, getCardsPackThunk,
    getMyCardsPackThunk,
    setCurrentFilterAC,
    setViewPacksAC
} from "../../app/reducers/packs-reducer";
import {Search} from "./Search/Search";
import {Search2} from "./Search/Search2";
import EnhancedTable from "./PacksTable/PacksTable";

export const Packs = () => {

    const dispatch = useAppDispatch();

    const name = useAppSelector(store => store.profile.user.name)
    const page = useAppSelector(store => store.packs.page)
    const isMyPacks = useAppSelector(store => store.packs.isMyPacks);
    const minCards = useAppSelector(state => state.packs.min)
    const maxCards = useAppSelector(state => state.packs.max)
    const maxCardsCount = useAppSelector(store => store.packs.cardsCount.maxCardsCount)
    const minCardsCount = useAppSelector(store => store.packs.cardsCount.minCardsCount)

    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value
        dispatch(filterCardsCountAC(min, max))
    }
    const getMyPackHandler = () => {
        dispatch(setViewPacksAC(true))
        dispatch(getMyCardsPackThunk());
    }
    const getAllPackHandler = () => {
        dispatch(setViewPacksAC(false))
        dispatch(setCurrentFilterAC('0updated'))
        dispatch(getCardsPackThunk());
    }

    useEffect(() => {
        dispatch(getCardsPackThunk());
    }, [dispatch, page, minCardsCount, maxCardsCount])


    if (!name) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.main}>
            <section className={s.setting}>
                <h2>Show packs cards</h2>
                <div className={s.userChooseButton}>
                    <SuperButton className={isMyPacks ? s.active : s.inactive} onClick={getMyPackHandler}>
                        MY
                    </SuperButton>
                    <SuperButton className={isMyPacks ? s.inactive : s.active} onClick={getAllPackHandler}>
                        ALL
                    </SuperButton>
                </div>
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
            </section>
            <section className={s.pack}>
                <div className={s.search}>
                    <Search/>
                </div>
                <div className={s.search}>
                    <Search2/>
                    <SuperButton>Add new pack</SuperButton>
                </div>

                <EnhancedTable/>
            </section>
        </div>
    )
}

