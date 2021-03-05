import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { AppStateType } from "../redux/redux-store";


export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {

    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />

            return <WrappedComponent {...this.props}/>
        }
    }

    let mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
    });

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;

    type PropsType = ReturnType<typeof mapStateToPropsForRedirect>
}

