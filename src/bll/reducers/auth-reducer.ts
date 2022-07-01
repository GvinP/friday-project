import {authAPI, LoginParamsType} from "../../api/api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {setAuthDataAC} from "./profile-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {registerAC, RegisterActionType} from "./registration-reducer";
import {AppThunk} from "../store";

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
    isLoggedIn: false,
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActions): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
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
export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn,
} as const);
export const loginTC = (data: LoginParamsType):AppThunk => ((dispatch) => {
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

export const logoutTC = ():AppThunk => (dispatch) => {
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
            dispatch(setAppStatusAC("idle"));
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



