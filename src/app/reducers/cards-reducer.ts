import {AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {cardsApi, CardType} from "../../api/cardsApi";


const initialState: InitialStateType = {
    cards: []
};

export const cardsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, cards: [...action.cards]};
        default:
            return state;
    }
};

export const getCardsThunk = (pack_id: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC(true))
    cardsApi.getCards(pack_id)
        .then(res => {
            dispatch(getCardsAC(res.cards));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppStatusAC(false))
        })
}

export const getCardsAC = (cards: CardType[]) =>
    ({type: "cards/GET-CARDS", cards} as const);


type InitialStateType = {
    cards: CardType[]
}

type ActionType = ReturnType<typeof getCardsAC>