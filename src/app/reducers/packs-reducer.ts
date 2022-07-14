import {AppThunk} from "../store";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {packsApi, PackType} from "../../api/packsApi";

const initialState = {
    cardPacks: [] as PackType[],
    pageCount: 5,
    cardPacksTotalCount: 5,
    min: 0,
    max: 110,
    cardsCount: {
        maxCardsCount: 0,
        minCardsCount: 0,
    },
    page: 1,
    isLoading: false,
    isMyPacks: false,
    searchResult: "",
    order: 0,
    orderBy: "name"
};

export type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionTypes): InitialStateType => {
    switch (action.type) {
        case "packs/GET-CARDS-PACK":
            return {...state, cardPacks: action.payload.cardPacks};
        case "packs/SET-SEARCH-RESULT":
            return {...state, searchResult: action.payload.searchResult};
        case "packs/SET-VIEW-PACKS":
            return {...state, isMyPacks: action.payload.isMyPacks};
        case "packs/SET-LOADING-PACK":
            return {...state, isLoading: action.payload.isLoading};
        case "packs/SET-CARD-PACKS-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.payload.cardPacksTotalCount};
        case  "packsList/SET-CURRENT-PAGE":
            return {...state, ...action.payload};
        case "packs/SET-MAX-MIN-CARDS-COUNT":
            return {...state, cardsCount: {maxCardsCount: action.max, minCardsCount: action.min}};
        case "packs/FILTER-CARDS-COUNT":
            return {...state, min: action.cardsCount.min, max: action.cardsCount.max};
        case "packsList/SET-PAGE-COUNT":
            return {...state, pageCount: action.payload.pageCount};
        case "packsList/SET-PACK-ORDER":
            return {...state, order: action.order}
        case "packsList/SET-PACK-ORDER-BY":
            return {...state, orderBy: action.orderBy}
        default:
            return state;
    }
};
export const addNewPackThunk = (name: string, makePrivate: boolean): AppThunk => (dispatch => {
    dispatch(setLoadingPackAC(true));
    packsApi.addNewPack(name, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false));
        });
});

export const getCardsPackThunk = (): AppThunk => (dispatch, getState) => {
    const {pageCount, page, isMyPacks, searchResult, min, max, order, orderBy} = getState().packs;
    const {_id} = getState().profile.user;
    const user_id = isMyPacks ? _id : "";
    const packName = searchResult ? searchResult : "";

    dispatch(setLoadingPackAC(true));
    packsApi.getCardsPack({
        pageCount, page, sortPacks: order + orderBy, user_id, packName, min, max,
    })
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
            dispatch(setMaxMinCardsCountAC(res.maxCardsCount, res.minCardsCount));
            if (!min && !max) {
                dispatch(filterCardsCountAC(res.minCardsCount, res.maxCardsCount));
            }
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false));
        });
};

export const addNewCardsPackThunk = (): AppThunk => (dispatch => {
    const packName = "This is new pack";
    const makePrivate = false;

    dispatch(setLoadingPackAC(true));
    packsApi.addNewPack(packName, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setLoadingPackAC(false)));
});

export const deleteCardsPackThunk = (packId: string): AppThunk => (dispatch => {
    dispatch(setLoadingPackAC(true));
    packsApi.deleteCardsPack(packId)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setLoadingPackAC(false)));
});

export const changeCardsPackNameThunk = (packId: string, newName: string): AppThunk => (dispatch => {

    dispatch(setLoadingPackAC(true));
    packsApi.changeCardsPackName(packId, newName)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setLoadingPackAC(false)));
});

export const searchCardsPackThunk = (packName: string): AppThunk => (dispatch, getState) => {
    const {pageCount, isMyPacks} = getState().packs;
    const {_id} = getState().profile.user;
    const user_id = isMyPacks ? _id : "";
    dispatch(setLoadingPackAC(true));
    packsApi.getCardsPack({pageCount, packName, user_id})
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false));
        });
};

export const setSearchResultAC = (searchResult: string) =>
    ({type: "packs/SET-SEARCH-RESULT", payload: {searchResult}} as const);
export const getCardsPackAC = (cardPacks: PackType[]) =>
    ({type: "packs/GET-CARDS-PACK", payload: {cardPacks}} as const);
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: "packs/SET-CARD-PACKS-TOTAL-COUNT", payload: {cardPacksTotalCount}} as const);
export const setMaxMinCardsCountAC = (max: number, min: number) =>
    ({type: "packs/SET-MAX-MIN-CARDS-COUNT", max, min} as const);
export const filterCardsCountAC = (min: number, max: number) =>
    ({type: "packs/FILTER-CARDS-COUNT", cardsCount: {min, max}} as const);
export const setViewPacksAC = (isMyPacks: boolean) =>
    ({type: "packs/SET-VIEW-PACKS", payload: {isMyPacks}} as const);
export const setLoadingPackAC = (value: boolean) =>
    ({type: "packs/SET-LOADING-PACK", payload: {isLoading: value}} as const);
export const setCurrentPageCardPacksAC = (page: number) =>
    ({type: "packsList/SET-CURRENT-PAGE", payload: {page}} as const);
export const setPageCountAC = (pageCount: number) =>
    ({type: "packsList/SET-PAGE-COUNT", payload: {pageCount}} as const);
export const setPackOrderAC = (order: number) =>
    ({type: "packsList/SET-PACK-ORDER", order} as const);
export const setPackOrderByAC = (orderBy: string) =>
    ({type: "packsList/SET-PACK-ORDER-BY", orderBy} as const);


export type PacksActionTypes =
    | ReturnType<typeof setSearchResultAC>
    | ReturnType<typeof getCardsPackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setMaxMinCardsCountAC>
    | ReturnType<typeof filterCardsCountAC>
    | ReturnType<typeof setViewPacksAC>
    | ReturnType<typeof setLoadingPackAC>
    | ReturnType<typeof setCurrentPageCardPacksAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setPackOrderAC>
    | ReturnType<typeof setPackOrderByAC>