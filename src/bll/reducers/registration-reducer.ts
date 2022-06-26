import {setAppErrorAC } from "./app-reducer";


const initialState = {

}
export type InitialStateType = typeof initialState
const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsTypes): InitialStateType => {
    switch(action.type) {
        // case 'some_action_type':
        //     return {
        //         ...state,

        //     }
        default: return state
    }
}

export type RegistrationActionsTypes =
    | ReturnType<typeof setAppErrorAC>
//написана ерунда


export default registrationReducer
