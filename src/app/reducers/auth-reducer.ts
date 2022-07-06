import {authAPI, LoginParamsType} from "../../api/api";
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from "./app-reducer";
import {setAuthDataAC} from "./profile-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {registerAC, RegisterActionType} from "./registration-reducer";
import {AppThunk} from "../store";

const initialState = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: 0,
    updated: 0,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    password: "",
    auth: false,
    rememberMe: false,
    error: "",  //ошибки от сервера
    isLoggedIn: false,
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActions): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn};
        case "login/LOGIN":
            return {...state, ...action.payload};
        case "login/LOGOUT":
            return {...state};
        default:
            return state;
    }
};
export const loginAC = (payload: InitialStateType) => ({type: "login/LOGIN", payload} as const);
export const logoutAC = () => ({type: "login/LOGOUT"} as const);
export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: "LOGIN/SET-IS-LOGGED-IN",
    isLoggedIn,
} as const);
export const loginTC = (data: LoginParamsType): AppThunk => ((dispatch) => {
    dispatch(setAppStatusAC(true));
    authAPI.login(data)
        .then(res => {
            dispatch(loginAC(res));
            dispatch(setAuthDataAC(res));
            dispatch(setAppIsInitializedAC(true));
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC(false));
        });
});

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC(true));
    authAPI.logout()
        .then((res) => {
            dispatch(logoutAC());
            dispatch(setAuthDataAC(res));
            dispatch(registerAC({isRegister: false}));
            dispatch(setAppIsInitializedAC(false))
        })
        .catch(e => {
            handleAppRequestError(e, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC(false));
        });
};
export type AuthActions =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAuthDataAC>
    | ReturnType<typeof setIsLoggedIn>
    | RegisterActionType



