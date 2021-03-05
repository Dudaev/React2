import { UserType } from "../types/types";
import { instance } from "./api";
import { MyResponseType } from "./autch-api";

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
    follow(userId: number) {
        return instance.post<MyResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}