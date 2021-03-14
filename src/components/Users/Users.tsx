import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, requestUsers } from '../../redux/users-reducer';
import { getCurrentPage, getfilter, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';

export const Users: React.FC = () => {
    const dispatch = useDispatch()

    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getfilter)

    const follow = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }

    const onPageChanged = (pageNumber: number ) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType ) => {
        dispatch(requestUsers(1, pageSize, filter));
    }

    useEffect(() => {
        dispatch( requestUsers(1, pageSize, filter));
    }, [])

    return <div>
        <UsersSearchForm onPageChanged={onFilterChanged}/>
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