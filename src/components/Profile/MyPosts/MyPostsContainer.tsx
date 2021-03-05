import { Dispatch } from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import { AppStateType, InferActionsTypes } from '../../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<InferActionsTypes<typeof actions>>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

export type MapDispatchToPropsType = ReturnType< typeof mapDispatchToProps>

export type MapStateToPropsType = ReturnType< typeof mapStateToProps>