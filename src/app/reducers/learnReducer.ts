import {learnAPI, UpdateGradeDataType} from "../../api/learnApi";
import {AppThunk} from "../store";
import {setLoadingPackAC} from "./packs-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {setIsFetchingCards, updateCardGradeAC} from "./cards-reducer";

type InitStateType = typeof initState;
type ActionType =
  | ReturnType<typeof setLearnPackNameAC>;
export type LearnActionsType = ActionType;


const initState = {
  cardsPackName: "",
};

export const setLearnPackNameAC = (cardsPackName: string) =>
  ({type: "learn/SET-LEARN-PACK-DATA", cardsPackName} as const);

// Thunk creators
export const gradeCardTC = (data: UpdateGradeDataType): AppThunk => (dispatch) => {
  dispatch(setLoadingPackAC(true));
  dispatch(setIsFetchingCards(true));
  learnAPI.gradeCard(data)
    .then(data => {
      dispatch(updateCardGradeAC(data.updatedGrade));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setLoadingPackAC(false));
      dispatch(setIsFetchingCards(false));
    });
};

export const learnReducer = (state: InitStateType = initState, action: LearnActionsType): InitStateType => {
  switch (action.type) {
    case "learn/SET-LEARN-PACK-DATA":
      return {...state, cardsPackName: action.cardsPackName};
    default:
      return state;
  }
};
