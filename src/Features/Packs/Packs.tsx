import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import s from './Packs.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {PacksTable} from "./PacksTable/PacksTable";
import {Paginator} from "./Paginator/Paginator";
import {Search} from "./Search/Search";

export const Packs = () => {

    const dispatch = useAppDispatch();

    const userName = useAppSelector<string>(store => store.profile.user.name)
    const status = useAppSelector<string>(store => store.app.status)

    if (!userName) {
        return <Navigate to={PATH.login}/>
    }
    return (<>
            <div className={s.mainBlock}>
                <section className={s.settingsSide}>
                    <h2>Show packs cards</h2>
                    <div className={s.userChooseButton}>

                    </div>
                    {status
                        ? <Preloader/>
                        : <div className={s.rangeBlock}>
                            <h3>Number of cards</h3>
                            {/*<DoubleRange*/}
                            {/*    rangeValues={[minCardsCount as number, maxCardsCount as number]}*/}
                            {/*    onChangeRange={filterCardsCount}*/}
                            {/*    min={minNumberOfCards}*/}
                            {/*    max={maxNumberOfCards}*/}
                            {/*/>*/}
                        </div>}
                </section>
                <section className={s.packList}>
                    <h1>PacksList</h1>
                    <div className={s.searchHeader}>
                        <Search/>
                    </div>
                    <PacksTable />
                    {/*<Paginator />*/}
                </section>
            </div>
        </>
    );
};

