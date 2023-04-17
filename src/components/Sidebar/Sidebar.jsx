import React from 'react';
import { Menu } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/Users.svg';
import styled from 'styled-components';
const items = [
    {
        key: '/dashboard/users',
        icon: <UserIcon />,
        label: 'Users',
        children: [
            {
                key: '/dashboard/myprofile',
                icon: <UserIcon />,
                label: 'My Profile'
            },
            {
                key: '/dashboard/users_list',
                icon: <UserIcon />,
                label: 'User List'
            },

            // {
            //     key: '/dashboard/create',
            //     icon: <UserIcon />,
            //     label: 'Create User'
            // },
            // {
            //     key: '/dashboard/detail',
            //     icon: <UserIcon />,
            //     label: 'User detail'
            // }
        ]
    },
    {
        key: '/dashboard/device',
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
    return (
        <SideBar trigger={null}>
            <Sider trigger={null} collapsible collapsed={props.collapsed}>
                <p>Menu</p>
                <Menu
                    onClick={item => {
                        navigate(item.key);
                    }}
                    mode="inline"
                    items={items}
                    style={{ height: '100%', borderRight: 0 }}
                ></Menu>
            </Sider>
        </SideBar>
    );
};
export default Sidebar;
