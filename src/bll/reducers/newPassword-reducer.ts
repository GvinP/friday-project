import {setAppErrorAC} from "./app-reducer";


const initialState = {}
export type InitialStateType = typeof initialState

const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordActionsTypes): InitialStateType => {
    switch (action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,

        //     }

        default:
            return state
    }
}
export type NewPasswordActionsTypes =
    | ReturnType<typeof setAppErrorAC>
//написана ерунда
export default newPasswordReducer
