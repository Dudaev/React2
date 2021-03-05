import { UserType } from "../types/types";

export const updateObjectInArray = (items: UserType[], itemId: number, objPropName: string, newObjProps: {followed: boolean}) => {
    return items.map(u => {
        if (u[objPropName as keyof UserType] === itemId) {
            return {...u, ...newObjProps }
        }
        return u;
    })
}
