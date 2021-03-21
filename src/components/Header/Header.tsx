import React from 'react';
import {NavLink} from "react-router-dom";
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { logout } from '../../redux/auth-reducer';

const { Text } = Typography;

const Header: React.FC = () => {
    const { Header } = Layout;
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    const login = useSelector((state:AppStateType) => state.auth.login)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    return <>
    <Header className="header">
      <div className="logo" />
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 11</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Col>
            {isAuth && <Col span={1}>
                <Avatar>K</Avatar>
            </Col>}
            <Col span={5} >
                <div>
                { isAuth
                    ? <div><Text type="success">{login}</Text> - <Button onClick={() => dispatch(logout())}>Log out</Button> </div>
                    : <Button><NavLink to={'/login'}>Login</NavLink></Button> }
                </div>
            </Col>
        </Row>
      
      
    </Header>
    </>
}

export default Header;