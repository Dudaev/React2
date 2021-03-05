import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLength50, required} from "../../../utils/validators/validators";

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<formDataKeysPropsType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<FormDataType>({form: 'dialog-add-message-form'})(AddMessageForm);
export type formDataKeysPropsType = keyof FormDataType
export type FormDataType = {
    newMessageBody: string
}

























