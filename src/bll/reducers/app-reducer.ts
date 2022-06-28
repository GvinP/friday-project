import {AppThunk} from "../store";
import {setAuthDataAC} from "./profile-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {authAPI} from "../../api/api";

const initialState = {
    status: "idle" as RequestStatusType,
    appError: null as string | null,
    isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActions): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status};
        case "APP/SET-ERROR":
            return {...state, ...action.payload};
        case "APP/SET-INITIALIZED":
            return {...state, ...action.payload};
        default:
            return {...state};
    }
};

export const setAppErrorAC = (value: string | null) => ({type: "APP/SET-ERROR", payload: {appError: value}} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const);
export const setAppIsInitializedAC = (value: boolean) =>
    ({type: "APP/SET-INITIALIZED", payload: {isInitialized: value}} as const);

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(data => {
            dispatch(setAuthDataAC(data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsInitializedAC(true));
        });
};

export type AppActions =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = typeof initialState
export default appReducer;