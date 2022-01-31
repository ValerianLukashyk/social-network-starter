import {instance, APIResponseType, UsersAPIType} from "./api";



export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 20, term: string = "", friend: null | boolean = null) {
        return await instance.get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => {
                return res.data
            })
            
            
    },
    async followUser(userID: number) {
        return await instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data)
    },
    async unFollowUser(userID: number) {
        return await instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>
    },
}