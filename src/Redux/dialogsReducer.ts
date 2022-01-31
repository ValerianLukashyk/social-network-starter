import { BaseThunkType, InferActionsType } from './redux-store'
import { MessagesType, PhotosType } from '../types/types'
import { FormAction } from 'redux-form'
import { dialogsAPI } from '../api/dialogs-api'

export type DialogsType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
}

let initialState = {
    dialogs: [] as Array<DialogsType>,
    messages: [] as MessagesType[],
    isFetching: false as boolean,
    totalCount: 100 as number,
    newMessageCount: 1 as number | null,
    error: '' as string | null
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/dialogs/GET_DIALOGS': {
            return {
                ...state, dialogs: action.dialogs
            }
        }
        case 'SN/dialogs/SET_MESSAGES': {
            return { ...state, messages: action.messages }
        }
        case 'SN/dialogs/SEND_MESSAGES': {
            // @ts-ignore
            return { ...state, messages: [...state.messages, { body: action.body }] }
        }
        case 'SN/dialogs/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'SN/dialogs/DELETE_MESSAGE': {
            return { ...state, messages: state.messages.filter((message) => message.id !== action.messageId) }
        }
        case 'SN/dialogs/RESTORE_MESSAGE': {
            return { ...state, messages: state.messages.filter((message) => message.id === action.messageId) }
        }
        case 'SN/dialogs/NEW_MESSAGES_COUNT': {
            return { ...state, newMessageCount: action.data }
        }

        default:
            return state;
    }
}

export const actions = {
    sendMessage: (body: MessagesType) => ({ type: 'SN/dialogs/SEND_MESSAGES', body } as const),
    setAllDialogs: (dialogs: Array<DialogsType>) => ({ type: 'SN/dialogs/GET_DIALOGS', dialogs } as const),
    setMessages: (messages: Array<MessagesType>) => ({ type: 'SN/dialogs/SET_MESSAGES', messages } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/dialogs/TOGGLE_IS_FETCHING', isFetching } as const),
    deleteMessage: (messageId: string) => ({ type: 'SN/dialogs/DELETE_MESSAGE', messageId } as const),
    restoreMessage: (messageId: string) => ({ type: 'SN/dialogs/RESTORE_MESSAGE', messageId } as const),
    newMessages: (data: any) => ({ type: 'SN/dialogs/NEW_MESSAGES_COUNT', data } as const),

}

export const getMyDialogs = (): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.getDialogs()
    // @ts-ignore
    dispatch(actions.setAllDialogs(data))
};

export const getMyMessages = (userId: number, page: number, count: number | null): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.getMessages(userId, page, count)
    dispatch(actions.setMessages(data))
    dispatch(actions.toggleIsFetching(false))
};

export const startMessaging = (userId: number, page: number, count: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    let data = await dialogsAPI.startMessages(userId)
    
    if (data.resultCode === 0) {
        dispatch(getMyMessages(userId, page, count))
    }
    if(data.resultCode === 1){
        console.log(data.messages)
    }
};

export const sendMessageReq = (userId: number, body: MessagesType): ThunkType => async (dispatch) => {

    const data = await dialogsAPI.sendMessage(userId, body)
    if (data.resultCode === 0) {
        dispatch(actions.sendMessage(body))
    }
    if(data.resultCode === 1){
        console.log(data.messages)
    }
};
export const deleteMessage = (messageId: string): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.deleteMessage(messageId)
    if (data.resultCode === 0) {
        dispatch(actions.deleteMessage(messageId))
    }
    if(data.resultCode === 1){
        console.log(data.messages)
    }
};
export const restoreMessage = (messageId: string): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.restoreDeletedMessages(messageId)
    if (data.resultCode === 0) {
        dispatch(actions.restoreMessage(messageId))
    }
    if(data.resultCode === 1){
        console.log(data.messages)
    }
};
export const newMessagesCount = (): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.newMessagesCount()

    dispatch(actions.newMessages(data))

};



export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
