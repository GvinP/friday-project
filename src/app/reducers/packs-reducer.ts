import {AppThunk} from "../store";
// import {setAppStatusAC} from "./app-reducer";
// import {cardsAPI} from "../../api/cardsApi";
// import {handleAppRequestError} from "../../common/utils/error-utils";
//
// const initialState = {
//     cardPacks: [] as PacksType[],
//     pageCount: 10,
//     cardPacksTotalCount: 0,
//     min: undefined as number | undefined, // o_O
//     max: undefined as number | undefined, // o_O
//     cardsCount: {
//         maxCardsCount: 0,
//         minCardsCount: 0,
//     },
//     page: 1,
//     isLoading: false,
//     filter: '0updated' as string,
//     isMyPacks: false,
//     searchResult: '',
// }
// export type PacksType = {
//     _id: string
//     user_id: string
//     user_name: string
//     private: boolean
//     name: string
//     path: string
//     grade: number
//     shots: number
//     deckCover: string
//     cardsCount: number
//     type: string
//     rating: number
//     created: string
//     updated: string
//     more_id: string
// }
// type InitialStateType = typeof initialState;
//
// export const packsReducer = (state:InitialStateType = initialState, action: ActionType): InitialStateType => {
//     switch (action.type) {
//         case 'packs/SET-SEARCH-RESULT':
//         case 'packs/GET-CARDS-PACK':
//         case 'packs/SET-CARD-PACKS-TOTAL-COUNT':
//             return {...state, ...action.payload}
//         default:
//             return state;
//     }
// }
// export const searchCardsPackThunk = (packName: string): AppThunk => (
//     dispatch, getState) => {
//     const {pageCount, isMyPacks} = getState().packs;
//     const {_id} = getState().profile.user;
//     const user_id = isMyPacks ? _id : '';
//     dispatch(setAppStatusAC("loading"));
//     cardsAPI.getCardsPack({pageCount, packName, user_id})
//         .then(res => {
//             dispatch(getCardsPackAC(res.cardPacks));
//             dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
//         })
//         .catch(error => handleAppRequestError(error, dispatch))
//         .finally(() => {
//             dispatch(setAppStatusAC("idle"));
//         })
// }
//
// export const setSearchResultAC = (searchResult: string) =>
//     ({type: 'packs/SET-SEARCH-RESULT', payload: {searchResult}} as const)
// export const getCardsPackAC = (cardPacks: PacksType[]) =>
//     ({type: 'packs/GET-CARDS-PACK', payload: {cardPacks}} as const);
// export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
//     ({type:'packs/SET-CARD-PACKS-TOTAL-COUNT', payload: {cardPacksTotalCount}} as const);
//
// type ActionType =
//     | ReturnType<typeof setSearchResultAC>
//     | ReturnType<typeof getCardsPackAC>
//     | ReturnType<typeof setCardPacksTotalCountAC>