import React, { useEffect, useState } from 'react'
import s from './Dialogs.module.css'
import { getMyDialogs, sendMessageReq, startMessaging } from '../../Redux/dialogsReducer'
import { Message } from './Message'
import { DialogItem } from './DialogItem'
import { useDispatch, useSelector } from 'react-redux'
import { getDialogsSelect, getMessagesSelect } from '../../Redux/Selectors/dialogs-selectors'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { MessagesType } from '../../types/types'
import { selectCurrentUserId } from '../../Redux/Selectors/auth-selectors'
import { Link, useParams } from 'react-router-dom'
import { SendMessageForm } from './SendMessageForm'
import Loader from '../common/preloader'
import { AppStateType } from '../../Redux/redux-store'


export type NewMessageFormValuesType = {
    body: string
}

const Dialogs: React.FC = () => {
    const [messageMode, setMessageMode] = useState(false)
    const [actualId, setActualId] = useState(0)
    const dialogs = useSelector(getDialogsSelect)
    const messages = useSelector(getMessagesSelect)
    const isFetching = useSelector((state: AppStateType) => state.dialogsPage.isFetching)
    const currentId = useSelector(selectCurrentUserId)
    const dispatch = useDispatch()

    const { userId, redirect } = useParams<{ userId: any, redirect: any }>()

    const startChat = (id: number) => {
        console.log('chat started')
        setMessageMode(true)
        dispatch(startMessaging(id, 1, null))
        setActualId(id)
    }



    useEffect(() => {
        if (userId) {

            startChat(userId)


        }
        if (!userId) {
            setMessageMode(false)
        }
        // eslint-disable-next-line
    }, [userId, redirect])

    useEffect(() => {
        dispatch(getMyDialogs())
        setMessageMode(false)
    }, [dispatch])

    let dialogsElements = dialogs.map((dialog, index) => (
        <DialogItem startChat={startChat} dialog={dialog} key={dialog.id || index} />
    ))

    let messagesElements = messages.slice(0).reverse().map((m, i) => (
        // @ts-ignore
        <Message myId={currentId} message={m} key={m.id || i} />
    ))

    let sendMessage = (id: number, body: MessagesType) => {
        dispatch(sendMessageReq(id, body))
    }

    return (
        <div className={s.dialogs}>
            {!messageMode ?
                <div>{dialogsElements}</div> :
                (<div className={s.dialogsHeight}>

                    <div className={s.messageContainer}>
                        {isFetching
                            ?
                            <Loader />
                            :
                            messagesElements
                        }
                        <Link to={'/Dialogs'} className={s.backArrow} ><ArrowLeftOutlined /></Link>
                    </div>
                    <SendMessageForm id={actualId} onSubmit={sendMessage} />
                </div>)}

        </div>
    )
}

export default Dialogs
