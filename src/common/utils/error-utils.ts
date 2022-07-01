import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../../app/reducers/app-reducer";
import {Dispatch} from "redux";

export const handleAppRequestError = (error: Error | AxiosError, dispatch: Dispatch) => {
    let errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as { error: string }).error
        : error.message + ", more details in the console";

    console.log(errorMessage);

    dispatch(setAppErrorAC(errorMessage));
};
