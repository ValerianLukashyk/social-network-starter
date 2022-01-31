import s from './Dialogs.module.css'
import React, { useState } from 'react'
import { MessagesType } from '../../types/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDispatch } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import { deleteMessage } from '../../Redux/dialogsReducer'
import {Typography} from "antd"

const {Text} = Typography

type PropsType = {
    message: MessagesType
    myId: number
}
export const Message: React.FC<PropsType> = ({ message, myId }) => {
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const delMessage = (messageId: string) => {
        dispatch(deleteMessage(messageId))
    }
    dayjs.extend(relativeTime)

    let messageAdded = dayjs(message.addedAt).local().format()

    let meSender = myId === message.senderId

    const handleHover = () => {
        hover ? setHover(false) : setHover(true)
    }

    return <div className={!meSender ? s.flexStart : s.flexEnd}>
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            className={!meSender ? s.userMessage : s.myMessage}
            style={{ transition: 'all 0.1s', position: 'relative', transform: `scale(${hover ? 1.05 : 1})`}}
        >
            {message.body}
            {meSender && hover
                ?
                <div style={{ position: 'absolute', right: 10, top: -20 }}>
                    <Text style={{marginRight: 10}}>{dayjs(messageAdded).fromNow()}</Text>
                    <CloseOutlined onClick={() => delMessage(message.id)} />
                </div>
                :
                null
            }
        </div>

    </div>
}