import {authAPI, LoginParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {setAuthDataAC} from "./profile-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {registerAC, RegisterActionType} from "./registration-reducer";

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: 0,
    updated: 0,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    password: "",
    auth: false,
    rememberMe: false,
    error: "",  //ошибки от сервера
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActions): InitialStateType => {
    switch (action.type) {
        case "login/AUTH_ME":
            return {...state, auth: true};
        case "login/LOGIN":
            return {...action.payload};
        case "login/LOGOUT":
            return {...initialState};
        default:
            return state;
    }
};
export const loginAC = (payload: InitialStateType) => ({type: "login/LOGIN", payload} as const);
export const logoutAC = () => ({type: "login/LOGOUT"} as const);
export const authMeAC = (auth: boolean) => ({type: "login/AUTH_ME", auth} as const);

export const authMeTC = () => ((dispatch: Dispatch<AuthActions>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.me()
        .then(res => {
            dispatch(authMeAC(true))
            dispatch(setAuthDataAC(res));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("succeeded"));
        });
});

export const loginTC = (data: LoginParamsType) => ((dispatch: Dispatch<AuthActions>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.login(data)
        .then(res => {
            dispatch(loginAC(res))
            dispatch(setAuthDataAC(res));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("succeeded"));
        });
});

export const logoutTC = () => (dispatch: Dispatch<AuthActions>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.logout()
        .then((res) => {
            dispatch(logoutAC())
            dispatch(setAuthDataAC(res));
            dispatch(registerAC({isRegister: false}));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("failed"));
        });
};
export type AuthActions =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAuthDataAC>
    | RegisterActionType



