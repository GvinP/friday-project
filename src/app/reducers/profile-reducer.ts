import {profileAPI, UserType} from "../../api/api";
import {setAppStatusAC} from "./app-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {AppThunk} from "../store";

const initialState = {
    user: {} as UserType
};
export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case "profile/SET-AUTH-DATA":
            return {...state, user: action.user};
        default:
            return state;
    }
};
export const updateNameTC = (name: string, avatar: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(true));
    profileAPI.updateUserData(name, avatar)
        .then(res => {
            dispatch(setAuthDataAC(res.updatedUser));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppStatusAC(false));
        });
};

export const setAuthDataAC = (user: UserType) => ({type: "profile/SET-AUTH-DATA", user} as const);

export type ProfileActionsTypes =
    | ReturnType<typeof setAuthDataAC>
    | ReturnType<typeof setAppStatusAC>

