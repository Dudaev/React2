import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';

type MyProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, MyProps> & MyProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<formDataKeysPropsType>("Email", "email", [required], Input)}
            {createField<formDataKeysPropsType>("Password", "password", [required], Input, {type: "password"})}
            {createField<formDataKeysPropsType>(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} />}
            { captchaUrl &&  createField<formDataKeysPropsType>("Symbols from image", "captcha", [required], Input, {}) }


            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, MyProps>({form: 'login'})(LoginForm)



type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login:(email: string, password: string, rememberMe: boolean, captcha: string ) => void
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type formDataKeysPropsType = keyof FormDataType

type LoginType = MapStateToPropsType & MapDispatchToPropsType
const Login: React.FC<LoginType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {login})(Login);