import s from './Post.module.css'
import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {DeleteOutlined, ExclamationCircleOutlined, LikeFilled, LikeOutlined} from '@ant-design/icons'
import {Card, Space, Modal, Tooltip} from 'antd/lib'

type PropsType = {
    userID: number | null
    message: string
    deletePost: (id: number) => void
    like: number
    id: number
}

const Post: React.FC<PropsType> = (props) => {
    const [likesCount, setLikesCount] = useState(props.like)
    const [liked, setLiked] = useState(false)
    const {userID, deletePost} = props
    
    const likePost = () => {
        setLikesCount(likesCount + 1)
        setLiked(true)
    }
    const dislikePost = () => {
        setLikesCount(likesCount - 1)
        setLiked(false)
    }

    function showDeleteConfirm() {
        // @ts-ignore
        Modal.confirm({
            centered: true,
            title: 'Delete',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure wanna delete this post?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deletePost(props.id)
            },
            onCancel() {

            },
        })
    }

    return (
        <Card style={{width: '100%', marginBottom: 10, borderRadius: 7, position: 'relative', padding: 0}}
              className={s.post}>
            <Space style={{alignItems: 'flex-start'}}>
                <NavLink to={'/profile/' + userID}>
                    <img className={s.avatar}
                         src={'https://social-network.samuraijs.com/activecontent/images/users/' + props.userID + '/user.jpg?v=6'}
                         alt={'avatar'}/>
                </NavLink>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start', fontSize: '1.3em'}}>
                    <span style={{lineHeight: 1.2}}>{props.message}</span>
                    {!liked ?
                        <div onClick={likePost} className={s.like}><b>{likesCount} </b><LikeOutlined
                            style={{fontSize: '20px', color: '#08c'}}/></div>
                        : <div onClick={dislikePost} className={s.like}><b>{likesCount} </b><LikeFilled
                            style={{fontSize: '20px', color: '#08c'}}/></div>
                    }
                </div>
                <Tooltip title="Delete post"><DeleteOutlined style={{fontSize: 17, position: 'absolute', right: '10px', top: '10px', color: 'red'}}
                                                             onClick={showDeleteConfirm}/></Tooltip>

            </Space>
        </Card>
    )
}
export default Post
