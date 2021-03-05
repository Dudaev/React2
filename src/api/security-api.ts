import { instance } from "./api";

export const securityAPI = {
    async getCaptchaUrl() {
        const res = await instance.get<{url: string}>(`security/get-captcha-url`);
        return res.data
    }
}