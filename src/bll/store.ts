
import {Action, AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AuthActions, authReducer} from "./reducers/auth-reducer";
import registrationReducer, {RegistrationActionsTypes} from "./reducers/registration-reducer";
import newPasswordReducer, {NewPasswordActionsTypes} from "./reducers/newPassword-reducer";
import passwordRecoveryReducer, {PasswordRecoveryActionsTypes} from "./reducers/passwordRecovery-reducer";
import appReducer, {AppActions} from "./reducers/app-reducer";
import profileReducer, {ProfileActionsTypes} from "./reducers/profile-reducer";

const rootReducer = combineReducers({
    registrationManage:combineReducers({
        registration: registrationReducer,
        login: authReducer,
        newPassword: newPasswordReducer,
        passwordRecovery: passwordRecoveryReducer,
    }),
    // loading: loadingReducer,
    app: appReducer,
    profile: profileReducer,
    auth:authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ThunkDispatch<RootState, unknown, StoreActions>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
type StoreActions = AppActions | AuthActions | NewPasswordActionsTypes
    | PasswordRecoveryActionsTypes | RegistrationActionsTypes | ProfileActionsTypes

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

export default store


// @ts-ignore
window.store = store // for dev