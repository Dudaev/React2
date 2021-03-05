import { instance } from "./api";

export enum MeResultCode{
    access = 0,
    error = 1,
}

export enum MeCaptchaResultCode{
    CaptchaError = 10
}

type MeTypesData = {
    id: number
    email: string
    login: string
}

export type MyResponseType<D ={}, R = MeResultCode> = {
    data: D
    resultCode: R
    messages: Array<string>

}

export const authAPI = {
    me() {
        return instance.get<MyResponseType<MeTypesData>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<MyResponseType<{userId: number}, MeCaptchaResultCode | MeResultCode>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}