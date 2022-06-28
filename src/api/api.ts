import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    //когда работаем локально
    // baseURL:process.env.REACT_APP_BACK_URL||'https://neko-back.herokuapp.com/2.0',
    //перед деплоем на гитхаб
});
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse>("auth/login", data)
            .then(res => res.data);
    },
    logout() {
        return instance.delete("auth/me")
            .then(res => res.data);
    },
    me() {
        return instance.post<UserType>(`auth/me`, {})
            .then(res => res.data);
    },
    register(data: RegisterParamType) {
        return instance.post(`auth/register`, data);
    },
    passRecovery(data: ForgotParamType) {
        return instance.post(`auth/forgot`, data);
    },
    forgot(email: string, message: string) {
        return instance.post<ResponseType>("auth/forgot", {email, message});
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>("auth/set-new-password", {password, resetPasswordToken});
    },
};

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type RegisterParamType = {
    email: string
    password: string
    confirmPassword?: string
}

export type ForgotParamType = {
    email: string
    from?: string
    message?: string
}

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}



