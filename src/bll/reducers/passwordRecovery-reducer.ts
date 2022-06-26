import {setAppErrorAC} from "./app-reducer";

const initialState = {

}
export type InitialStateType = typeof initialState
const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsTypes): InitialStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,

        //     }

        default: return state
    }
}
export type PasswordRecoveryActionsTypes =
    | ReturnType<typeof setAppErrorAC>
//написана ерунда

export default passwordRecoveryReducer
