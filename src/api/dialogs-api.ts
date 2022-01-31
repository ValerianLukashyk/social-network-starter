import {APICountResponseType, APIResponseType, GetMessagesAPIType, instance} from './api'
import {DialogsType} from '../Redux/dialogsReducer'
import {MessagesType} from '../types/types'

export const dialogsAPI = {
    async getDialogs() {
        return instance.get<DialogsType>(`dialogs`)
            .then(res => res.data)
    },
    async startMessages(userId: number) {
        return instance.put<APIResponseType>(`dialogs/${userId}`)
            .then(res => res.data)
    },
    async getMessages(userId: number, page: number, count: number | null = null) {
        return instance.get<GetMessagesAPIType>(`dialogs/${userId}/messages?page=${page}&count=${count}`)
            .then(res => res.data.items)
    },
    async sendMessage(userId: number, body: MessagesType) {
        return instance.post<APIResponseType>(`dialogs/${userId}/messages`, {body})
            .then(res => res.data)
    },
    async deleteMessage(messageId: string) {
        return instance.delete<APIResponseType>(`dialogs/messages/${messageId}`)
            .then(res => res.data)
    },
    async newMessagesCount() {
        
        return instance.get<APICountResponseType>(`dialogs/messages/new/count`)
            .then(res => res.data)
    },
    async restoreDeletedMessages(messageId:string) {
        return instance.get<APIResponseType>(`dialogs/messages/${messageId}/restore`)
            .then(res => res.data)
    },

}