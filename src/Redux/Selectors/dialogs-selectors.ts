import {AppStateType} from '../redux-store'


export const getDialogsSelect = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}
export const getMessagesSelect = (state: AppStateType) => {
    return state.dialogsPage.messages
}
export const getIsFetching = (state: AppStateType) => {
    return state.dialogsPage.isFetching
}
export const messagesCount = (state: AppStateType) => {
    return state.dialogsPage.newMessageCount
}
