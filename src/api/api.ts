import axios from 'axios'
import {MessagesType, UserType} from '../types/types'

export const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '7ad07a8c-60db-42f6-95bc-cdf770effbcd'
        }
    }
)

//TypeScript UsersAPI
export type UsersAPIType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type GetMessagesAPIType = {
    items: MessagesType[]
    totalCount: number
    error: string | null
}

// Enums
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {error:string}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
    
}
export type APICountResponseType = {
    config: {}
    data: number
    headers: {}
    request: XMLHttpRequest
    status: number
    statusText: string

}
