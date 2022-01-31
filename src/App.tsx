import React, { useEffect, useState } from 'react'
import store, { AppStateType } from './Redux/redux-store'
import { BrowserRouter, Link, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import 'antd/dist/antd.css'
import './style.css'
import { LoginPage } from './components/Login/loginPage'
import { initializeApp } from './Redux/app-reducer'
import Loader from './components/common/preloader'
import { withSuspense } from './Hoc/WithSuspense'
import { Users } from './components/Users/Users'
import Layout from 'antd/lib/layout'
import { slide as Menu } from 'react-burger-menu'
import { HomeOutlined, MessageOutlined, UsergroupAddOutlined, WechatOutlined } from '@ant-design/icons'
import { AppHeader } from './components/Header/Header'
import { BackTop, Tooltip } from 'antd'

const { Content, Footer } = Layout

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

library.add(far)

// type StatePropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = {
//     initializeApp: () => void
// }

const SuspendedDialogs = withSuspense(Dialogs)
const SuspendedProfile = withSuspense(Profile)
const SuspendedChat = withSuspense(ChatPage)

const styles = {
    bmBurgerButton: {
        color: 'white',
        position: 'fixed',
        width: '28px',
        height: '25px',
        right: '36px',
        top: '18px'
    },
    bmBurgerBars: {
        background: '#ffffff'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        width: '260px'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '2.15em'
    },
    bmMorphShape: {
        fill: '#fc122c'
    },
    bmItemList: {
        display: 'flex',
        flexDirection: 'column',
        color: '#b8b7ad',
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}


const App: React.FC = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    useEffect(() => {
        const onRouteChanged = () => {
            setMenuIsOpen(false)
        }
        let prevLocation
        if (location !== prevLocation) {
            onRouteChanged();
            prevLocation = location
        }
    },[location])

    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(JSON.stringify(e.reason.message))
        
        console.log(e)
        // return <Alert message={e}/>
    }

    useEffect(() => {
        dispatch(initializeApp())

        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [dispatch])



    if (!initialized) {
        return <Loader />
    }
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Tooltip title={'Menu'}>
                <div>
                    <Menu onClose={() => setMenuIsOpen(false)} onOpen={() => setMenuIsOpen(true)} isOpen={menuIsOpen} styles={styles} right>
                        <Link to="/profile">
                            <HomeOutlined style={{ fontSize: 30, margin: 0 }} />Profile
                        </Link>
                        <Link to="/dialogs">
                            <MessageOutlined style={{ fontSize: 30, margin: 0 }} />Messages
                        </Link>
                        <Link to="/users">
                            <UsergroupAddOutlined style={{ fontSize: 30, margin: 0 }} />Users
                        </Link>
                        <Link to="/chat">
                            <WechatOutlined style={{ fontSize: 30, margin: 0 }} />Chat
                        </Link>
                    </Menu>
                </div>
            </Tooltip>
            <Content className={'content-field'}
                style={{ padding: '0 2em', height: '100%', width: '100%', margin: 'auto', marginTop: 70 }}>
                <BackTop />
                <div className="site-layout-content">
                    <Switch>
                        <Route exact path="/"
                            render={() => <Redirect to={'/profile'} />} />
                        <Route path="/dialogs/:userId?"
                            render={() => isAuth ? <SuspendedDialogs /> : <Redirect to="/login" />} />
                        <Route path="/profile/:userID?"
                            render={() => <SuspendedProfile />} />
                        <Route path="/users"
                            render={() => <Users />} />
                        <Route path="/news"
                            render={() => <News />} />
                        <Route path="/music"
                            render={() => <Music />} />
                        <Route path="/settings"
                            render={() => <Settings />} />
                        <Route path="/login"
                            render={() => <LoginPage />} />
                        <Route path="/chat"
                            render={() => <SuspendedChat />} />
                        <Route path="*"
                            render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Social Network ©2022 Created by Valerian Lukashyk</Footer>
        </Layout>
    )

}

const SocNetApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
}

export default SocNetApp
