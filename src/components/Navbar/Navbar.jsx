import React, { useEffect, useState } from 'react';
import { Col, Layout, Menu, Space, Avatar, Row, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../shared/services/http-client';
const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';

function logOut() {
  sessionStorage.removeItem("token");
  window.location.reload()
}
const Navbar = props => {
  const [useUser, setUser] = useState()
  useEffect(() => {
    axiosInstance.get("/users/me?populate=role,avatar").then(res => {
      setUser(res);
    })
  }, {});
  console.log(11111);

  const InforUser = styled.div`
    margin-top: -4px;
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
  `;
  const IconCollapse = styled.div`
    color: #212121;
    width: 20px;
    height: 14.5px;
    margin-left: 15px;
    margin-bottom: 45px;
    font-size: 16px;
  `;
  const handleClick = () => {
    props.toggle();
  };
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logOut}>My profile</Menu.Item>
      <Menu.Item key="logout" onClick={logOut}>Logout</Menu.Item>
    </Menu>
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
              <Avatar src={useUser.avatar} />
            </AvatarUser>
            <InforUser>
              <Row>{useUser.fullname}</Row>
              <Row>{useUser.role.name}</Row>
            </InforUser>
          </Row>
        </Col>
      </Dropdown>
    </NavBar>
  );
};
export default Navbar;
