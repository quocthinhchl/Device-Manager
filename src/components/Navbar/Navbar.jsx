import React, { useEffect, useState } from 'react';
import { Col, Layout, Menu, Space, Avatar, Row, Dropdown, Popover, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../shared/constants';
import { UserProfile } from '../../stores/Slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';

const InforUser = styled.div`
    margin-top: -4px;
    width: 118px;
    height: 42px;
    white-space: nowrap;
    .ant-row:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #cbcbcb;
    }

    .ant-row:first-child {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #111111;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }

  `;
const AvatarUser = styled.div`
    margin-right: 10px;
  `;
const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    background: #fff;
    width: 100%;
    height: 64px;
    padding: 16px;
    .ant-dropdown-menu{
      margin-top: 14px;
    }
  `;
const IconCollapse = styled.div`
    color: #212121;
    width: 20px;
    height: 14.5px;
    margin-left: 15px;
    margin-bottom: 45px;
    font-size: 16px;
    margin-top: 7px;
  `;
const Navbar = (props) => {
  const navigate = useNavigate();
  const userProfile = useSelector(UserProfile)

  function logOut() {
    localStorage.removeItem("token");

    props.setToken(null)
  }

  function myProfile() {
    navigate('/dashboard/myprofile')
  }

  const handleClick = () => {
    props.toggle();
  };
  const menuChild = [
    {
      label: 'My profile',
      key: 'myProfile',
      onClick: { myProfile },
    },
    {
      label: 'Logout',
      key: 'logout',
      onClick: { logOut },
    },
  ]
  const menu = (
    <Menu>
      <Menu.Item key="myProfile" onClick={myProfile}>My profile</Menu.Item>
      <Menu.Item key="logout" onClick={logOut}>Logout</Menu.Item>
    </Menu>
  );
  const content = (
    <Space direction="vertical">
      <Button type="text" onClick={myProfile}>My profile</Button>
      <Button type="text" onClick={logOut}>Logout</Button>
    </Space>
  );
  return (
    <NavBar>
      <IconCollapse>
        <MenuOutlined onClick={handleClick} />
      </IconCollapse>
      <Dropdown overlay={menu}>
        <Col>
          <Row justify={'space-between'}>
            <AvatarUser>
              <Avatar src={API + userProfile.user_profile.avatar?.url} />
            </AvatarUser>
            <InforUser>
              <Row>{userProfile.user_profile.fullname}</Row>
              <Row>{userProfile.user_profile.role?.name}</Row>
            </InforUser>
          </Row>
        </Col>
      </Dropdown>
      {/* <Popover content={content} trigger="hover">
        <Col>
          <Row justify={'space-between'}>
            <AvatarUser>
              <Avatar src={API + userProfile.user_profile.avatar?.url} />
            </AvatarUser>
            <InforUser>
              <Row>{userProfile.user_profile.fullname}</Row>
              <Row>{userProfile.user_profile.role?.name}</Row>
            </InforUser>
          </Row>
        </Col>
      </Popover> */}
    </NavBar>
  );
};
export default Navbar;
