import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import s from "./Packs.module.css";
import SuperButton from "../../common/SuperButton/SuperButton";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";
import {
    addNewCardsPackThunk, addNewPackThunk,
    filterCardsCountAC, getCardsPackThunk,
    setSearchResultAC,
    setViewPacksAC
} from "../../app/reducers/packs-reducer";
import PacksTable from "./PacksTable/PacksTable";
import {Preloader} from "../../common/Preloader/Preloader";
import {Navigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {Search2} from "./Search/Search2";
import {Button, ButtonProps, styled} from "@mui/material";
import {AddPackModal} from "../../Modal/AddPackModal/AddPackModal";
import {lightBlue} from "@mui/material/colors";


export const Packs = () => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);
    const minCards = useAppSelector(state => state.packs.min);
    const maxCards = useAppSelector(state => state.packs.max);
    const maxCardsCount = useAppSelector(state => state.packs.cardsCount.maxCardsCount);
    const minCardsCount = useAppSelector(state => state.packs.cardsCount.minCardsCount);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);
    const page = useAppSelector(state => state.packs.page);
    const pageCount = useAppSelector(state => state.packs.pageCount);
    const order = useAppSelector(state => state.packs.order);
    const orderBy = useAppSelector(state => state.packs.orderBy);

    const [activeAddPackModal, setActiveAddPackModal] = useState(false);

    const [name, setName] = useState<string>("");
    const [makePrivate, setMakePrivate] = useState(false);


    const filterCardsCount = (value: [number, number]) => {
        const [min, max] = value;
        dispatch(filterCardsCountAC(min, max));
    };
    const addPack = () => {
        dispatch(addNewPackThunk(name, makePrivate));
        dispatch(setSearchResultAC(""));
        setActiveAddPackModal(false);
    };
    const getMyPackHandler = () => {
        dispatch(setViewPacksAC(true));

    };
    const getAllPackHandler = () => {
        dispatch(setViewPacksAC(false));
    };

    const addNewPackHandler = () => {
        dispatch(addNewCardsPackThunk());
        setActiveAddPackModal(true);
    };
    const onFocusHandler = () => {
        name ? setName(name) : setName("Name");
    };


    useEffect(() => {
        if (isInitialized) {
            dispatch(getCardsPackThunk());
        }
    }, [dispatch, isInitialized, minCards, maxCards, page, pageCount, isMyPacks, order, orderBy]);


    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(lightBlue[50]),
        backgroundColor: lightBlue[50],
        '&:hover': {
            backgroundColor: lightBlue[200],
        },
    }));

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
                    <Search2/>
                    <div className={s.btn}>
                        <ColorButton variant={"outlined"} color="success" onClick={addNewPackHandler}>Add new pack</ColorButton>
                    </div>
                </div>
                <PacksTable/>
            </section>
            <AddPackModal active={activeAddPackModal}
                          setActive={setActiveAddPackModal}
                          name={name}
                          inputValue={name}
                          setInputValue={setName}
                          inputFocus={onFocusHandler}
                          addPack={addPack}
                          makePrivate={(isPrivate) => setMakePrivate(isPrivate)}
            />

        </div>

    );
};

