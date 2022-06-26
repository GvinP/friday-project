const initialState: InitialStateType = {
    testValue: ''
}

export const testReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-TEST-VALUE':
            return {...state, testValue: action.newValue}
        default:
            return state
    }
}

export const setTestValueAC = (newValue: string) =>
    ({type: 'SET-TEST-VALUE', newValue} as const)


type InitialStateType = {
    testValue: string
}

type ActionType = ReturnType<typeof setTestValueAC>