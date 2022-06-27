import { setAppStatusAC} from "./app-reducer";
import {authAPI} from "../../api/api";
import {Dispatch} from "redux";
import {handleAppRequestError} from "../../common/utils/error-utils";

const initialState = {
    info: '',
    error: null as null | string,
    success: false,
}
type InitialStateType = typeof initialState
export type NewPasswordActions =
    | ReturnType<typeof setNewPassSuccessAC>
    | ReturnType<typeof setAppStatusAC>

export const setNewPassSuccessAC = (success: boolean) => ({
    type: 'newPassword/SET-NEW-PASSWORD-SUCCESS',
    success
} as const)

export const setNewPassTC = (password: string, token: string) => (dispatch: Dispatch<NewPasswordActions>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.setNewPassword(password, token)
        .then(() => {
            dispatch(setNewPassSuccessAC(true))
        })
        .catch((e) => {
            // const error = e.response
            //     ? e.response.data.error
            //     : (e.message + ', more details in the console');
            handleAppRequestError(e, dispatch)
            // dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordActions): InitialStateType => {
    switch (action.type) {
        case 'newPassword/SET-NEW-PASSWORD-SUCCESS':
            return {...state, success: action.success};
        default:
            return state
    }
}


export default newPasswordReducer
