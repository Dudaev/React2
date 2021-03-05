import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "d40e4671-b1b0-42b5-99e0-02dfc3c12a84"
    }
});

export type LogoutTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}