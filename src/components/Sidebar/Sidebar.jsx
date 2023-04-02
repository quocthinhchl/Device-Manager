import React from 'react';
import { Col, Menu } from 'antd';
import { ProfileOutlined, MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';
const items = [{
    key: '/dashboard/users',
    icon: <ProfileOutlined />,
    label: 'Users',
    // children: [{
    //     key: '/users',
    //     icon: <ProfileOutlined />,
    //     label: 'Users',
    // }]
}
    , {
    key: '/device',
    icon: <ProfileOutlined />,
    label: 'Device',
    // children: [{
    //     key: '/device',
    //     icon: <ProfileOutlined />,
    //     label: 'Users',
    // }]
}]
const Sidebar = (props) => {
    const navigate = useNavigate()
    return (
        <div trigger={null} className="sidebar">
            <Sider trigger={null} collapsible collapsed={props.collapsed}>
                <p>Menu</p>
                <Menu
                    onClick={item => {
                        navigate(item.key)
                    }}
                    mode='inline'
                    items={items}
                    style={{ height: '100%', borderRight: 0 }}
                >
                </Menu>
            </Sider>
        </div>
    )
}
export default Sidebar