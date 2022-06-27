import {authAPI, LoginParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {setAuthDataAC} from "./profile-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {registerAC, RegisterActionType} from "./registration-reducer";

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
    rememberMe: false,
    error: "",  //ошибки от сервера
};
export const clearTodosData = () => ({type: "CLEAR-DATA"} as const);
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActions): InitialStateType => {
    switch (action.type) {
        case "login/AUTH_ME":
            return {...action.payload};
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
export const authMeAC = (payload: InitialStateType) => ({type: "login/AUTH_ME", payload} as const);


export const loginTC = (data: LoginParamsType) => ((dispatch: Dispatch<AuthActions>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.login(data)
        .then(res => {
            dispatch(setAuthDataAC(res));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ", more details in the console");
            handleAppRequestError(e, dispatch);
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC("succeeded"));
        });
});

export const logoutTC = () => (dispatch: Dispatch<AuthActions>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.logout()
        .then((res) => {
            dispatch(setAppErrorAC(res.info));
            dispatch(setAuthDataAC(res));
            dispatch(registerAC({isRegister: false}));
            // dispatch(setAppStatusAC('succeeded'))
            dispatch(clearTodosData());
            handleAppRequestError(res.data, dispatch);
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ", more details in the console");
            dispatch(setAppErrorAC(error));
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC("failed"));
        });
};
export type AuthActions =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof clearTodosData>
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAuthDataAC>
    | RegisterActionType



