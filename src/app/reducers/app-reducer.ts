import {AppThunk} from "../store";
import {setAuthDataAC} from "./profile-reducer";
import {authAPI} from "../../api/api";


const initialState = {
    status: true,
    appError: null as string | null,
    isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActions): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.payload.appIsLoading};
        }
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.payload.appIsInitialized};
        default:
            return {...state};
    }
};

export const setAppErrorAC = (value: string | null) => ({type: "APP/SET-ERROR", payload: {appError: value}} as const);
export const setAppStatusAC = (status: boolean) => ({
    type: "APP/SET-STATUS",
    payload: {appIsLoading: status}
} as const);
export const setAppIsInitializedAC = (isInitialized: boolean) =>
    ({type: "APP/SET-INITIALIZED", payload: {appIsInitialized: isInitialized}} as const);

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(data => {
            dispatch(setAuthDataAC(data));
            dispatch(setAppIsInitializedAC(true));
        })
        .catch(error => {
            const errorMessage = error.response
                ? error.response.data.error
                : (error.message + ", more details in the console");
            console.log("Error: ", errorMessage);
        })
        .finally(() => {
            dispatch(setAppStatusAC(false));
        });
};

export type AppActions =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>

export type InitialStateType = typeof initialState