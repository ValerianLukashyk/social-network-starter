import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../Redux/chat-reducer'
import { AppStateType } from '../../Redux/redux-store'
import { ChatMessageAPIType } from '../../api/chat-api'


const ChatPage: React.FC = () => {
    return <div style={{ backgroundColor: 'rgba(231,231,231,0.54)', padding: 10, margin: 10, boxShadow: '0 0 4px 2px rgba(138, 138, 138, 0.34)' }}>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return <div >
        {status === 'error' && <div style={{ color: 'red' }}>Some error occurred. Please refresh page</div>}

        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }
    useEffect(() => {
        if (autoScroll) {
            messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, autoScroll])

    return <div className={'chat'} style={{ height: '65vh', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m} />)}
        <div ref={messagesRef} />
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
    console.log(">>>>>>Message")
    return <div>
        <Avatar size={'default'} src={message.photo} /><b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}
)
const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')

    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <Input.TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} rows={4} name='newPostText'
            placeholder='Post'
            style={{ background: 'none', resize: 'none', marginBottom: 10 }} />
        <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
    </div>
}

export default ChatPage