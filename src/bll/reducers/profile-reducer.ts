import {UserType} from "../../api/api";

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

export const setAuthDataAC = (user: UserType) => ({type: "profile/SET-AUTH-DATA", user} as const);

export type ProfileActionsTypes = ReturnType<typeof setAuthDataAC>

