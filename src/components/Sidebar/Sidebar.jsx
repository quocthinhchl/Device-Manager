import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/Users.svg';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
const items = [
    {
        key: '/dashboard/users_list',
        icon: <UserIcon />,
        label: 'Users',
    },
    {
        key: '/dashboard/device_list',
        icon: <UserIcon />,
        label: 'Device',

    },
];
const SideBar = styled.div`
  .ant-layout-sider .ant-layout-sider-children > ul {
    margin-top: 35px;
  }
  .ant-layout-sider .ant-layout-sider-children ul li span{
    color: #8767E1;
  }
  .ant-layout-sider .ant-layout-sider-children p {
    width: 45px;
    height: 24px;
    position: relative;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    left: 20px;
    top: 25px;
    color: #111111;
  }
`;
const Sidebar = props => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('1');
    const [selectedKeys, setSelectedKeys] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const matchingItem = items.find((item) => currentPath.includes(item.key));
        if (matchingItem) {
            setSelectedKeys([matchingItem.key]);
        }
    }, [location]);
    return (
        <SideBar trigger={null}>
            <Sider trigger={null} collapsible collapsed={props.collapsed} >
                {/* <p onClick={() => { navigate('/dashboard') }}>Menu</p> */}
                <img
                    style={{
                        paddingLeft: 2,
                        height: 70,
                    }}
                    src={logo} onClick={() => { navigate('/dashboard') }} />
                <Menu
                    onClick={item => {
                        navigate(item.key);
                        setSelectedKeys([item.key]);
                    }}
                    mode="inline"
                    items={items}
                    selectedKeys={selectedKeys}
                    style={{ height: '100%', borderRight: 0 }}
                ></Menu>
            </Sider>
        </SideBar >
    );
};
export default Sidebar;
