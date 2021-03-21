import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, UserFollow, requestUsers, UserUnfollow } from '../../redux/users-reducer';
import { getCurrentPage, getfilter, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';
import * as queryString from 'query-string'
import { useHistory } from "react-router-dom";

export const Users: React.FC = () => {
    const dispatch = useDispatch()

    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getfilter)
    const history = useHistory()

    const follow = (userId: number) => {
        dispatch(UserFollow(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(UserUnfollow(userId));
    }

    const onPageChanged = (pageNumber: number ) => {
        debugger
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${pageNumber}`
        })
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType ) => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${actualPage}`
        })
        dispatch(requestUsers(1, pageSize, filter));
    }

    const parsed: {
        term?: string
        friend?: 'true' | 'false' | 'null'
        page?: string
    } = queryString.parse(history.location.search)
    const actualFilter = {...filter}
    let actualPage = currentPage

    if (parsed.term) {
        actualFilter.term = parsed.term
    }
    if (parsed.friend) {
        actualFilter.friend = parsed.friend === 'true' ? true : parsed.friend === 'false' ? false : null
    }
    if (parsed.page && parsed.page !== '1') {
        actualPage = +parsed.page
    }

    useEffect(() => {
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} initialValue={actualFilter}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize} filter={filter}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollow}
                                     follow={follow}
                    />
                )
            }
        </div>
    </div>
}