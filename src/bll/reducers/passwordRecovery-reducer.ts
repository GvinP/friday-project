import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, ForgotParamType} from "../../api/api";
import {Dispatch} from "redux";
import {handleAppRequestError} from "../../common/utils/error-utils";

const initialState: ForgotParamType = {
    email: "",
};


export type InitialStateType = typeof initialState
export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsTypes): InitialStateType => {
    switch (action.type) {
        case "passwordRecovery/SEND_FORGOT_PASSWORD":
            return {
                ...state,
                email: action.payload.email
            };

        default:
            return state;
    }
};
export type PasswordRecoveryActionsTypes =
    | ReturnType<typeof setAppErrorAC>
    | SendForgotPasswordActionType

export type SendForgotPasswordActionType = ReturnType<typeof sendForgotPasswordAC>

export const sendForgotPasswordAC = (payload: InitialStateType) => ({
    type: "passwordRecovery/SEND_FORGOT_PASSWORD",
    payload
} as const);

// thunk
export const sendForgotPasswordTC = (email: string) => ((dispatch: Dispatch) => {
    const from = "test-front-admin <ai73a@yandex.by>";
    const message = `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`;

    dispatch(setAppStatusAC("loading"));
    authAPI.passRecovery({email, from, message})
        .then(res => {
            dispatch(sendForgotPasswordAC({email}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("succeeded"));
        });
});

