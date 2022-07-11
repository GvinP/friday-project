import {AppThunk} from "../store";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {cardsApi, CardType, NewCardDataType} from "../../api/cardsApi";
import {setLoadingPackAC} from "./packs-reducer";


const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 5,
    page: 1
};

export const cardsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, cards: [...action.cards], cardsTotalCount: action.cardsTotalCount};
        default:
            return state;
    }
};

export const getCardsThunk = (pack_id: string, pageCount: number, page: number): AppThunk => (dispatch, getState) => {
    dispatch(setLoadingPackAC(true));
    cardsApi.getCards(pack_id, pageCount, page)
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
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false))
        })
}

export const addCardThunk = (cardId: string, question: string, answer: string): AppThunk => (dispatch) => {
    dispatch(setLoadingPackAC(true))
    cardsApi.addCard(cardId, question, answer)
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
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setLoadingPackAC(false))
        })
}

export const getCardsAC = (cards: CardType[], cardsTotalCount: number) =>
    ({type: "cards/GET-CARDS", cards, cardsTotalCount} as const);

type InitialStateType = {
    cards: CardType[]
    cardsTotalCount: number
    page: number
}

type ActionType = ReturnType<typeof getCardsAC>