import React from 'react';
import { Users } from './Users';
import Preloader from "../common/Preloader/Preloader";

export const UsersContainer = (props: any) => {

    return<>
        <h2>{props.pageTitle}</h2>
        {props.isFetching ? <Preloader/> : null}
        <Users />
    </>
} 