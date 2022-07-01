import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, RegisterParamType} from "../../api/api";
import {Dispatch} from "redux";
import {handleAppRequestError} from "../../common/utils/error-utils";

const initialState = {
    isRegister: false
}

export type InitialStateType = typeof initialState
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsTypes): InitialStateType => {
    switch (action.type) {
        case "registration/REGISTER_ME":
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export type RegistrationActionsTypes =
    | ReturnType<typeof setAppErrorAC>
    | RegisterActionType

export type RegisterActionType = ReturnType<typeof registerAC>

export const registerAC = (payload: InitialStateType) => ({type: "registration/REGISTER_ME", payload} as const);

export const registerTC = (data: RegisterParamType) => ((dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.register(data)
        .then(() => {
            dispatch(registerAC({isRegister: true}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"));
        });
});

