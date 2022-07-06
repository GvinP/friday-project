import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import s from "./Packs.module.css";
import SuperButton from "../../common/SuperButton/SuperButton";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {
    addNewCardsPackThunk,
    filterCardsCountAC, getCardsPackThunk,
    setCurrentFilterAC,
    setViewPacksAC
} from "../../app/reducers/packs-reducer";
import {Search} from "./Search/Search";
import PacksTable from "./PacksTable/PacksTable";
import {Preloader} from "../../common/Preloader/Preloader";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);
    const minCards = useAppSelector(state => state.packs.min);
    const maxCards = useAppSelector(state => state.packs.max);
    const maxCardsCount = useAppSelector(state => state.packs.cardsCount.maxCardsCount);
    const minCardsCount = useAppSelector(state => state.packs.cardsCount.minCardsCount);

    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value;
        dispatch(filterCardsCountAC(min, max));
    };
    const getMyPackHandler = () => {
        dispatch(setViewPacksAC(true));

    };
    const getAllPackHandler = () => {
        dispatch(setViewPacksAC(false));
        dispatch(setCurrentFilterAC("0updated"));
    };

    const addNewPackHandler = () => {
        dispatch(addNewCardsPackThunk());
    };

    useEffect(() => {
        console.log("render getCardsPackThunk");
        dispatch(getCardsPackThunk());
    }, [isMyPacks]);

    console.log("status: ", status);
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
            </section>
        </div>
    );
};

