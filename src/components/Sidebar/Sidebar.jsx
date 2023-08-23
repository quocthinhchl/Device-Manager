import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { OrderedListOutlined, UserOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/Users.svg';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../stores/Slice/UserSlice';

const SideBar = styled.div`
  .ant-layout-sider .ant-layout-sider-children > ul {
    /* margin-top: 25px; */
  }
  .ant-layout-sider .ant-layout-sider-children ul li span {
    color: #8767e1;
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
  img {
    padding-left: 10px;
    height: 80px;
  }
  img:hover {
    cursor: pointer;
  }
`;

const items = [
  {
    key: '/dashboard/users_list',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: '/dashboard/device_list',
    icon: <UserIcon />,
    label: 'Device',
  },
];

const itemsAdmin = [
  {
    key: '/dashboard/admin/users_list',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: '/dashboard/admin/device_list',
    icon: <UserIcon />,
    label: 'Device',
  },
  {
    key: '/dashboard/admin/category_list',
    icon: <UserIcon />,
    label: 'Category',
  },
  {
    key: '/dashboard/device_list',
    icon: <OrderedListOutlined />,
    label: 'Borrow',
  },
];

const Sidebar = props => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();
  const userProfile = useSelector(UserProfile);

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = items.find(item => currentPath.includes(item.key));
    if (matchingItem) {
      setSelectedKeys([matchingItem.key]);
    } else setSelectedKeys(null);
  }, [location]);
  return (
    <SideBar trigger={null}>
      <Sider trigger={null} collapsible collapsed={props.collapsed}>
        {/* <p onClick={() => { navigate('/dashboard') }}>Menu</p> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          <img
            src={logo}
            onClick={() => {
              navigate('/dashboard');
            }}
          />{' '}
        </div>

        <Menu
          onClick={item => {
            navigate(item.key);
            setSelectedKeys([item.key]);
          }}
          mode="inline"
          items={userProfile.isAdmin ? itemsAdmin : items}
          selectedKeys={selectedKeys}
          style={{ height: '100%', borderRight: 0 }}
        ></Menu>
      </Sider>
    </SideBar>
  );
};
export default Sidebar;
