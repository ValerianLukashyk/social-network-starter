import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../Redux/redux-store'


export const WithRedirect: React.FC = (Component: any) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    
    return (<>
        {isAuth ? <Component /> : <Redirect to="/login" />}
    </>)
}