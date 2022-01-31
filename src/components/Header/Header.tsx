import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Col, Layout, Popover, Row, Space, Tooltip } from 'antd/lib/'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectUserLogin } from '../../Redux/Selectors/auth-selectors'
import { logout } from '../../Redux/auth-reducer'
import logo from '../../img/Logo.png'
import { Typography } from 'antd'
import { newMessagesCount } from '../../Redux/dialogsReducer'
import { messagesCount } from '../../Redux/Selectors/dialogs-selectors'
import { RiLogoutCircleRLine, RiMailUnreadFill, RiMailOpenLine } from 'react-icons/ri'
import { ImUser } from 'react-icons/im'
const { Title } = Typography
export type PropsType = {}

export const AppHeader: React.FC<PropsType> = (props) => {
    const { Header } = Layout
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectUserLogin)
    const dispatch = useDispatch()
    const newMessages = useSelector(messagesCount)

    useEffect(() => {
        dispatch(newMessagesCount())
    }, [dispatch])

    const logoutCallback = () => {
        dispatch(logout())
    }

    const content = (
        <div >
            <Link to={'/dialogs'} style={{ display: 'flex', alignItems: 'center' }}>
                {newMessages && newMessages > 0
                    ?
                    <RiMailUnreadFill size={18} />
                    :
                    <RiMailOpenLine size={18} />
                }
                Messages ({newMessages})
            </Link>
        </div>
    )
    const title = (
        <Link to={'/profile'}>{login}</Link>
    )
    return (
        <Header className={'header'} style={{ backgroundColor: '#373a47', position: 'fixed', width: '100%', zIndex: 10 }}>
            <Row justify="space-between">
                <Col span={16}>
                    <Link to="/">
                        <Space>
                            <img style={{ width: 70 }} src={logo} alt="Logo" />
                            <Title level={3} style={{ color: '#e7e7e7', margin: 10 }}>HOOKER</Title>
                        </Space>
                    </Link>
                </Col>
                <Col span={6}>
                    {isAuth
                        ?
                        <Space align="center">
                            <Popover overlayInnerStyle={{ color: 'white' }} color={'#373a47'} style={{ backgroundColor: '#373a47', color: 'white' }} content={content} title={title}>
                                <Avatar
                                    style={{ backgroundColor: 'transparent', }}
                                    size={{ xs: 25, sm: 30, md: 35, lg: 40, xl: 45, xxl: 47 }}
                                    icon={<ImUser size={30} />}
                                />
                            </Popover>
                            <Tooltip title={'LogOut'} >
                                <Button style={{ verticalAlign: '-8px' }} onClick={logoutCallback} ghost shape="circle" icon={<RiLogoutCircleRLine size={25} />} />
                            </Tooltip>
                        </Space>
                        :
                        <Link to={'/login'}>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    }
                </Col>

            </Row>
        </Header>
    )
}

