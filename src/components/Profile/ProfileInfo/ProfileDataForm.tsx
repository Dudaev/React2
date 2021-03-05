import React from "react";
import s from './ProfileInfo.module.css';
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";
import { ProfileType } from "../../../types/types";

const ProfileDataForm:React.FC<InjectedFormProps<FormDataType, OwnFormDataType> & OwnFormDataType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField<ProfileKeysType>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: { createField<ProfileKeysType>("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField<ProfileKeysType>("My professional skills", "lookingForAJobDescription", [], Textarea  )}
        </div>
 

        <div>
            <b>About me</b>:
            { createField<ProfileKeysType>("About me", "aboutMe", [], Textarea  )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
            <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<FormDataType, OwnFormDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;

export type FormDataType = {
    formData: File
}
export type OwnFormDataType = {
    profile: ProfileType
}

type ProfileKeysType = GetStringKeys<ProfileType>