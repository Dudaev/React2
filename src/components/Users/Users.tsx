import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number, filter: FilterType) => void 
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    filter: FilterType
}

let Users: React.FC<PropsType> = ({filter, currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return <div>
        <UsersSearchForm onPageChanged={onPageChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize} filter={filter}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}




export default Users;