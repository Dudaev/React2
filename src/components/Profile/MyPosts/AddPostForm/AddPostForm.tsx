import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from '../../../../utils/validators/validators';
import { createField, Textarea } from '../../../common/FormsControls/FormsControls';

let AddPostForm: React.FC<InjectedFormProps<AddPostDataType>> = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <div>
                {createField<formDataKeysPropsType>("Post message", "newPostText", [required], Textarea)}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

export default reduxForm<AddPostDataType>({form: "ProfileAddNewPostForm"})(AddPostForm);
export type formDataKeysPropsType = keyof AddPostDataType
export type AddPostDataType = {
    newPostText: string
}