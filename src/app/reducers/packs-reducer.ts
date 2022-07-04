import {AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {packsApi, PackType} from "../../api/packsApi";

const initialState = {
    cardPacks: [] as PackType[],
    pageCount: 10,
    cardPacksTotalCount: 0,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    cardsCount: {
        maxCardsCount: 0,
        minCardsCount: 0,
    },
    page: 1,
    isLoading: false,
    filter: '0updated' as string,
    isMyPacks: false,
    searchResult: '',
}

export type InitialStateType = typeof initialState

export const packsReducer = (state:InitialStateType = initialState, action: PacksActionTypes): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-SEARCH-RESULT':
        case 'packs/GET-CARDS-PACK':
        case 'packs/SET-VIEW-PACKS':
        case  'packs/SET-CURRENT-FILTER':
        case 'packs/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, ...action.payload}
        case 'packs/SET-MAX-MIN-CARDS-COUNT':
            return {...state, cardsCount: {maxCardsCount: action.max, minCardsCount: action.min}}
        case 'packs/FILTER-CARDS-COUNT':
            return {...state, ...action.cardsCount}
        default:
            return state;
    }
}

export const getCardsPackThunk = (): AppThunk => (dispatch, getState) => {
    const {pageCount, page, filter, isMyPacks, searchResult, min, max} = getState().packs;
    const {_id} = getState().profile.user
    const user_id = isMyPacks ? _id : ''
    const packName = searchResult ? searchResult : ''

    dispatch(setAppStatusAC('loading'))
    packsApi.getCardsPack({
        pageCount, page, sortPacks: filter, user_id, packName, min, max,
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
            dispatch(setAppStatusAC('idle'))
        })
}
export const getMyCardsPackThunk = (): AppThunk => (dispatch, getState) => {
    const {_id} = getState().profile.user;
    const {pageCount} = getState().packs;
    dispatch(setAppStatusAC("loading"));
    dispatch(setSearchResultAC(''));
    dispatch(setCurrentFilterAC('0updated'));
    packsApi.getCardsPack({user_id: _id, pageCount})
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppStatusAC("idle"));
        })
}

export const searchCardsPackThunk = (packName: string): AppThunk => (
    dispatch, getState) => {
    const {pageCount, isMyPacks} = getState().packs;
    const {_id} = getState().profile.user;
    const user_id = isMyPacks ? _id : '';
    dispatch(setAppStatusAC("loading"));
    packsApi.getCardsPack({pageCount, packName, user_id})
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppStatusAC("idle"));
        })
}

export const setSearchResultAC = (searchResult: string) =>
    ({type: 'packs/SET-SEARCH-RESULT', payload: {searchResult}} as const)
export const getCardsPackAC = (cardPacks: PackType[]) =>
    ({type: 'packs/GET-CARDS-PACK', payload: {cardPacks}} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
    ({type:'packs/SET-CARD-PACKS-TOTAL-COUNT', payload: {cardPacksTotalCount}} as const)
export const setMaxMinCardsCountAC = (max: number, min: number) =>
    ({type:'packs/SET-MAX-MIN-CARDS-COUNT', max, min} as const)
export const filterCardsCountAC = (min: number, max: number) =>
    ({type: 'packs/FILTER-CARDS-COUNT', cardsCount: {min, max}} as const)
export const setViewPacksAC = (isMyPacks: boolean) =>
    ({type: 'packs/SET-VIEW-PACKS', payload: {isMyPacks}} as const);
export const setCurrentFilterAC = (filter: string) =>
    ({type:  'packs/SET-CURRENT-FILTER', payload: {filter}} as const);

export type PacksActionTypes =
    | ReturnType<typeof setSearchResultAC>
    | ReturnType<typeof getCardsPackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setMaxMinCardsCountAC>
    | ReturnType<typeof filterCardsCountAC>
    | ReturnType<typeof setViewPacksAC>
    | ReturnType<typeof setCurrentFilterAC>