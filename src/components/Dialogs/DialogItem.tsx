import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom'
import React from 'react'
import {DialogsType} from '../../Redux/dialogsReducer'
import userPhoto from '../../img/user.png'
import {Divider} from 'antd'
import Badge from 'antd/lib/badge'
import Space from 'antd/lib/space'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

type PropsType = {
    dialog: DialogsType
    startChat: (id:number)=>void
}
export const DialogItem: React.FC<PropsType> = ({dialog, startChat}) => {
    const {id, userName, hasNewMessages, lastDialogActivityDate, lastUserActivityDate, newMessagesCount, photos} = dialog
    let path = '/Dialogs/' + id

    const startChatWithUser = (id: number) => {
        startChat(id)
    }
    dayjs.extend(relativeTime)
    dayjs.extend(utc)

    let lastMessage = dayjs(lastDialogActivityDate).local().format()
    let lastActivity = dayjs(lastUserActivityDate).local().format()

    return (
        <NavLink to={path}>
            <div onClick={()=> startChatWithUser(id)} className={`${s.dialog} ${hasNewMessages ? s.active : ''}`}>
                <Space>
                    <img src={photos.small ? photos.small : userPhoto} alt="user" style={{borderRadius: '50%',width: 100}}/>
                    <Divider type={'vertical'} style={{height: 75,}}/>
                    <div style={{fontSize: 20, color: 'black'}}>
                        {userName}
                        <div style={{color: '#919191', fontSize: 14}}>Last message: {dayjs(lastMessage).fromNow()}</div>
                        <div style={{color: '#fc621d', fontSize: 14}}>Last activity: {dayjs(lastActivity).fromNow()}</div>
                    </div>
                    <Divider type={'vertical'} style={{height: 75,}}/>
                    <Badge count={newMessagesCount}>
                        <span className="head-example" />
                    </Badge>
                </Space>
            </div>
        </NavLink>
    )
}