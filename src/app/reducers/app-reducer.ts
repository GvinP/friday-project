import {AppThunk} from "../store";
import {setAuthDataAC} from "./profile-reducer";
import {authAPI} from "../../api/api";


const initialState = {
    status: "idle" as RequestStatusType,
    appError: null as string | null,
    isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActions): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
        case "APP/SET-ERROR":
        case "APP/SET-INITIALIZED":
            return {...state, ...action.payload};
        default:
            return {...state};
    }
};

export const setAppErrorAC = (value: string | null) => ({type: "APP/SET-ERROR", payload: {appError: value}} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS",
    payload: {appIsLoading: status}
} as const);
export const setAppIsInitializedAC = (isInitialized: boolean) =>
    ({type: "APP/SET-INITIALIZED", payload: {appIsInitialized: isInitialized}} as const);

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(data => {
            dispatch(setAuthDataAC(data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(error => {
            const errorMessage = error.response
                ? error.response.data.error
                : (error.message + ', more details in the console');
            console.log('Error: ', errorMessage);
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