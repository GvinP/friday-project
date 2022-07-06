import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import s from "./Packs.module.css";
import SuperButton from "../../common/SuperButton/SuperButton";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {
    addNewCardsPackThunk,
    filterCardsCountAC, getCardsPackThunk, getMyCardsPackThunk,
    setCurrentFilterAC, setCurrentPageCardPacksAC,
    setViewPacksAC
} from "../../app/reducers/packs-reducer";
import {Search} from "./Search/Search";
import PacksTable from "./PacksTable/PacksTable";
import {Preloader} from "../../common/Preloader/Preloader";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {Paginator} from "./Paginator/Paginator";

export const Packs = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);
    const minCards = useAppSelector(state => state.packs.min);
    const maxCards = useAppSelector(state => state.packs.max);
    const maxCardsCount = useAppSelector(state => state.packs.cardsCount.maxCardsCount);
    const minCardsCount = useAppSelector(state => state.packs.cardsCount.minCardsCount);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);
    // const currentPage = useAppSelector(state => state.packs.page);
    // const pageSize = useAppSelector(state => state.packs.pageCount);
    // const totalCountPage = useAppSelector(state => state.packs.cardPacksTotalCount);

    useEffect(() => {
        dispatch(getCardsPackThunk());
    }, [dispatch, minCards, maxCards]);


    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value;
        dispatch(filterCardsCountAC(min, max));
    };
    const getMyPackHandler = () => {
        dispatch(setViewPacksAC(true));
        dispatch(getMyCardsPackThunk());

    };
    const getAllPackHandler = () => {
        dispatch(setViewPacksAC(false));
        dispatch(setCurrentFilterAC("0updated"));
        dispatch(getCardsPackThunk());
    };

    const addNewPackHandler = () => {
        dispatch(addNewCardsPackThunk());
    };
    // const changePageHandler = (page: number) => {
    //     dispatch(setCurrentPageCardPacksAC(page))
    // }


    if (!isInitialized) {
        return <Navigate to={PATH.login}/>;
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
                {(status)
                    ? <Preloader/>
                    : <div>
                        <h3> Number of cards</h3>
                        <DoubleRange
                            rangeValues={[minCards as number, maxCards as number]}
                            onChangeRange={filterCardsCount}
                            min={minCardsCount}
                            max={maxCardsCount}
                        />
                    </div>
                }
            </section>
            <section className={s.pack}>
                <div className={s.search}>
                    <Search/>
                    <div className={s.btn}>
                        <SuperButton onClick={addNewPackHandler}>Add pack</SuperButton>
                    </div>
                </div>
                <PacksTable/>
                {/*<Paginator currentPage={currentPage}*/}
                {/*           pageSize={pageSize}*/}
                {/*           totalCount={totalCountPage}*/}
                {/*           onPageChange={changePageHandler}*/}
                {/*           siblingCount={2}*/}
                {/*/>*/}
            </section>
        </div>
    );
};

