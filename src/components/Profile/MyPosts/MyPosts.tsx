import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { PostType } from '../../../types/types';
import AddPostForm, { AddPostDataType } from './AddPostForm/AddPostForm';
import { MapDispatchToPropsType, MapStateToPropsType } from './MyPostsContainer';

const MyPosts: React.FC<MapDispatchToPropsType & MapStateToPropsType> = React.memo(props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let onAddPost = (values: AddPostDataType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;