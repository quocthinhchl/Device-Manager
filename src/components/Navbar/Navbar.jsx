import React from 'react';
import { Col, Layout, Menu, Space, Avatar, Row, Popover, Dropdown } from 'antd';
import './Navbar.css'
import { ProfileOutlined, MailOutlined, SettingOutlined, AppstoreOutlined, MenuOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons'
import styled from 'styled-components';
const { Header, Sider, Content } = Layout;

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';
const Navbar = (props) => {
    const logOut = (<a>Log out</a>)
    const handleClick = () => {
        props.toggle();
    }
    const menu = (
        <Menu>
            <Menu.Item key="logout">
                {/* <LogoutOutlined /> */}
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <div className='navbar'>
            <div>
                <a className='icon' onClick={handleClick} >
                    <MenuOutlined />
                </a>
            </div>
            <Dropdown overlay={menu}>
                <div style={{ marginLeft: '10px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ marginRight: 10, }}>
                            <Avatar src={url} className='avatar' />
                        </div>
                        <div style={{ marginTop: -4, }}>
                            <Row className='name'>
                                Ha Nguyen
                            </Row>
                            <Row className='role'>
                                Admin
                            </Row>
                        </div>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}
export default Navbar