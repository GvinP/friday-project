import {Action, AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AuthActions, authReducer} from "./reducers/auth-reducer";
import {RegistrationActionsTypes, registrationReducer} from "./reducers/registration-reducer";
import {NewPasswordActions, newPasswordReducer} from "./reducers/newPassword-reducer";
import {PasswordRecoveryActionsTypes, passwordRecoveryReducer} from "./reducers/passwordRecovery-reducer";
import {AppActions, appReducer} from "./reducers/app-reducer";
import {ProfileActionsTypes, profileReducer} from "./reducers/profile-reducer";
import {CardsActionType, cardsReducer} from "./reducers/cards-reducer";
import {PacksActionTypes, packsReducer} from "./reducers/packs-reducer";
import {LearnActionsType, learnReducer} from "./reducers/learnReducer";

const rootReducer = combineReducers({
    registrationManage: combineReducers({
        registration: registrationReducer,
        login: authReducer,
        newPassword: newPasswordReducer,
        passwordRecovery: passwordRecoveryReducer,
    }),
    app: appReducer,
    profile: profileReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = ThunkDispatch<RootState, unknown, StoreActions>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
type StoreActions = AppActions | AuthActions | NewPasswordActions
    | PasswordRecoveryActionsTypes | RegistrationActionsTypes | ProfileActionsTypes | PacksActionTypes | CardsActionType| LearnActionsType;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

export default store;


// @ts-ignore
window.store = store; // for dev