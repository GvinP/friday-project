import {AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, PacksType} from "../../api/cardsApi";
import {handleAppRequestError} from "../../common/utils/error-utils";

const initialState = {
    cardPacks: [] as PacksType[],
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
    cardsAPI.getCardsPack({
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

export const searchCardsPackThunk = (packName: string): AppThunk => (
    dispatch, getState) => {
    const {pageCount, isMyPacks} = getState().packs;
    const {_id} = getState().profile.user;
    const user_id = isMyPacks ? _id : '';
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getCardsPack({pageCount, packName, user_id})
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
export const getCardsPackAC = (cardPacks: PacksType[]) =>
    ({type: 'packs/GET-CARDS-PACK', payload: {cardPacks}} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
    ({type:'packs/SET-CARD-PACKS-TOTAL-COUNT', payload: {cardPacksTotalCount}} as const)
export const setMaxMinCardsCountAC = (max: number, min: number) =>
    ({type:'packs/SET-MAX-MIN-CARDS-COUNT', max, min} as const)
export const filterCardsCountAC = (min: number, max: number) =>
    ({type: 'packs/FILTER-CARDS-COUNT', cardsCount: {min, max}} as const)

export type PacksActionTypes =
    | ReturnType<typeof setSearchResultAC>
    | ReturnType<typeof getCardsPackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setMaxMinCardsCountAC>
    | ReturnType<typeof filterCardsCountAC>