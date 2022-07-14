import {AppThunk, RootState} from "../store";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {cardsApi, CardType, GetCardsQueryParams, GetCardsResponseDataType, NewCardDataType} from "../../api/cardsApi";
import {setLoadingPackAC} from "./packs-reducer";
import {UpdatedGradeType} from "../../api/learnApi";


const initialState = {
    cards: [] as Array<CardType>,
    pack_id: '',
    pageCount: 5,
    cardsTotalCount: 1,
    page: 1,
    order: 0,
    orderBy: 'question',
    isFetchingCards: false,
    cardAnswer: "",
    cardQuestion: "",
    sortCards: '0updated',
};
export type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType):InitialStateType => {
    switch (action.type) {
        case "cards/UPDATE_CARD_GRADE":
            const {card_id, grade, shots} = action.updatedGrade;
            return {
                ...state,
                cards: state.cards.map(c => c._id === card_id ? {...c, grade, shots} : c),
            };
        case "cards/SET_CARDS_DATA":
            return {...state, ...action.payload};
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
        case "cards/SET_IS_FETCHING":
            return {...state, isFetchingCards: action.value};
        default:
            return state;
    }
};

export const getCardsTC = (params: GetCardsQueryParams): AppThunk => (dispatch, getState: () => RootState) => {
    const {
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
    } = getState().cards;

    const queryParams: GetCardsQueryParams = {
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
        ...params,
    };

    dispatch(setLoadingPackAC(true));
    dispatch(setIsFetchingCards(true));
    cardsApi.getCards2(queryParams)
        .then(data => {
            dispatch(setCardsDataAC(data));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setLoadingPackAC(false));
            dispatch(setIsFetchingCards(false));
        });
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
export const setCardsDataAC = (data: GetCardsResponseDataType) =>
    ({type: "cards/SET_CARDS_DATA", payload: data} as const);
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
export const setIsFetchingCards = (value: boolean) =>
    ({type: "cards/SET_IS_FETCHING", value} as const);
export const updateCardGradeAC = (updatedGrade: UpdatedGradeType) =>
    ({type: "cards/UPDATE_CARD_GRADE", updatedGrade} as const);


// type InitialStateType = {
//     cards: CardType[]
//     pack_id: string
//     pageCount: number
//     cardsTotalCount: number
//     page: number
//     order: number
//     orderBy: string
// }

export type CardsActionType =
   | ReturnType<typeof getCardsAC>
    | ReturnType<typeof setPackIdAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setOrderAC>
    | ReturnType<typeof setOrderByAC>
    | ReturnType<typeof setIsFetchingCards>
    | ReturnType<typeof updateCardGradeAC>
    | ReturnType<typeof setCardsDataAC>