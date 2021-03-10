import { UserType } from "../types/types";
import { instance } from "./api";
import { MyResponseType } from "./auth-api";

type GetUsersTypes = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get<GetUsersTypes>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<MyResponseType>(`follow/${userId}`)
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete(`follow/${userId}`)
        return response.data as Promise<MyResponseType>;
    }
}