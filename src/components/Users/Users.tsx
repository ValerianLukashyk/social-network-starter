import { FC, useEffect, useState } from 'react'
import styles from './users.module.css'
import User from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, follow, requestUsers, unfollow } from '../../Redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {getUsers} from '../../Redux/Selectors/users-selectors'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
import Space from 'antd/lib/space'
import Pagination from 'antd/lib/pagination'
import Loader from '../common/preloader'
import { AppStateType } from '../../Redux/redux-store'



type QueryParamsType = { term?: string, page?: string, friend?: string }


export const Users: FC = () => {
    const [pageSize, setPageSize] = useState(useSelector((state: AppStateType) => state.usersPage.pageSize))
    const [currentPage, setCurrentPage] = useState(useSelector((state: AppStateType) => state.usersPage.currentPage))
    const [filter, setFilter] = useState(useSelector((state: AppStateType) => state.usersPage.filter))
    
    const totalUsersCount = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const users = useSelector(getUsers)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)
    const followingInProgress = useSelector((state: AppStateType) => state.usersPage.followingInProgress)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [currentPage, dispatch, filter, pageSize, history])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend) {query.friend = String(filter.friend)}
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage, history])

    useEffect(()=>{
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[currentPage, dispatch, pageSize, filter])

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const onPageSizeChanged = (current: number, size: number) => {
        setCurrentPage(1)
        setPageSize(size)
    }

    const onFilterChanged = (filter: FilterType) => {
        setCurrentPage(1)
        console.log(filter)
        setFilter(filter)
    }
    
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }
    
    return <div className={styles.body}>
        <Space direction={'vertical'} style={{width: '100%'}}>
            <Pagination
                style={{ marginTop: 10 }}
                onChange={onPageChanged}
                current={currentPage}
                total={totalUsersCount}
                pageSize={pageSize}
                onShowSizeChange={onPageSizeChanged}
            />
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            {isFetching
                ?
                <Loader />
                :
                <div>
                    <Space direction={'vertical'} style={{width: '100%'}}>
                        {users.map((u, i) =>
                            <User user={u}
                                key={u.id}
                                isAuth={isAuth}
                                followingInProgress={followingInProgress}
                                follow={followUser}
                                unfollow={unfollowUser}
                            />)
                        }
                    </Space>
                </div>
            }
            <Pagination
                onChange={onPageChanged}
                current={currentPage}
                total={totalUsersCount}
                pageSize={pageSize}
                onShowSizeChange={onPageSizeChanged}
            />
        </Space>

    </div>
}
