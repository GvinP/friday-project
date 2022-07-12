import {AppThunk} from "../store";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {cardsApi, CardType, NewCardDataType} from "../../api/cardsApi";
import {setLoadingPackAC} from "./packs-reducer";


const initialState: InitialStateType = {
    cards: [],
    pack_id: '',
    pageCount: 5,
    cardsTotalCount: 1,
    page: 1,
    order: 0,
    orderBy: 'question'
};


export const cardsReducer = (state = initialState, action: CardsActionType) => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, cards: [...action.cards], cardsTotalCount: action.cardsTotalCount};
        case "cards/SET-PACK-ID":
            return {...state, pack_id: action.packId}
        case "cards/SET-CURRENT-PAGE":
            return {...state, page: action.page}
        case "cards/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "cards/SET-ORDER":
            return {...state, order: action.order}
        case "cards/SET-ORDER-BY":
            return {...state, orderBy: action.orderBy}
        default:
            return state;
    }
};

export const getCardsThunk = (): AppThunk =>
    (dispatch, getState) => {
        const pack_id = getState().cards.pack_id
        const pageCount = getState().cards.pageCount
        const page = getState().cards.page
        const order = getState().cards.order
        const orderBy = getState().cards.orderBy
        dispatch(setLoadingPackAC(true));
        cardsApi.getCards(pack_id, pageCount, page, order, orderBy)
            .then(res => {
                dispatch(getCardsAC(res.cards, res.cardsTotalCount));
            })
            .catch(error => handleAppRequestError(error, dispatch))
            .finally(() => {
                dispatch(setLoadingPackAC(false));
            });
    };

export const deleteCardThunk = (cardId: string): AppThunk => (dispatch) => {
    dispatch(setLoadingPackAC(true))
    cardsApi.deleteCard(cardId)
        .then(() => {
            dispatch(getCardsThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false))
        })
}

export const addNewCardTC = (newCard: NewCardDataType): AppThunk => (dispatch) => {
    dispatch(setLoadingPackAC(true));
    cardsApi.createCard(newCard)
        .then(() => {
            dispatch(getCardsThunk());
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setLoadingPackAC(false));
        });
};

export const updateCardThunk = (cardId: string, newQuestion: string, newAnswer: string): AppThunk => (dispatch) => {
    dispatch(setLoadingPackAC(true))
    cardsApi.updateCard(cardId, newQuestion, newAnswer)
        .then(() => {
            dispatch(getCardsThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false))
        })
}

export const getCardsAC = (cards: CardType[], cardsTotalCount: number) =>
    ({type: "cards/GET-CARDS", cards, cardsTotalCount} as const);
export const setPackIdAC = (packId: string) =>
    ({type: "cards/SET-PACK-ID", packId} as const);
export const setCurrentPageAC = (page: number) =>
    ({type: "cards/SET-CURRENT-PAGE", page} as const);
export const setPageCountAC = (pageCount: number) =>
    ({type: "cards/SET-PAGE-COUNT", pageCount} as const);
export const setOrderAC = (order: number) =>
    ({type: "cards/SET-ORDER", order} as const);
export const setOrderByAC = (orderBy: string) =>
    ({type: "cards/SET-ORDER-BY", orderBy} as const);


type InitialStateType = {
    cards: CardType[]
    pack_id: string
    pageCount: number
    cardsTotalCount: number
    page: number
    order: number
    orderBy: string
}

export type CardsActionType = ReturnType<typeof getCardsAC> | ReturnType<typeof setPackIdAC>
    | ReturnType<typeof setPageCountAC> | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setOrderAC> | ReturnType<typeof setOrderByAC>