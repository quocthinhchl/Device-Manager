import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  theme,
  Descriptions,
  Col,
  Avatar,
  Row,
  Button,
  Space,
  Divider,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/services/http-client';
import { API } from '../../../shared/constants';
import { UserProfile } from '../../../stores/Slice/UserSlice';
import { useSelector } from 'react-redux';
import UserAvatar from '../../../assets/images/user-avatar.png';
const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';

const PathName = styled.p`
  margin: 10px 25px 0px 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #111111;
`;

const Content = styled.div`
  margin: 15px 16px;
  padding: 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;
const ViewProfile = () => {
  const buttonStyle = {
    backgroundColor: '#8767E1',
    color: '#fff',
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const userProfile = useSelector(UserProfile);

  return (
    <>
      <PathName>My Profile</PathName>
      <Content>
        <Col>
          <Row>
            <Col
              span={8}
              style={{
                paddingLeft: 100,
                flexGrow: 1,
              }}
            >
              {userProfile.user_profile.avatar ? (
                <Avatar size={200} src={userProfile.user_profile.avatar?.url} />
              ) : (
                <Avatar size={200} src={UserAvatar} />
              )}
            </Col>
            <Col
              span={16}
              style={{
                paddingLeft: 150,
                flexGrow: 1,
              }}
            >
              <Descriptions title="" layout="vertical" column={2}>
                <Descriptions.Item label="Name">
                  {userProfile.user_profile.fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {userProfile.user_profile.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {userProfile.user_profile.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="DOB">
                  {userProfile.user_profile.dob}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {userProfile.user_profile.role?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Position">
                  {userProfile.user_profile.position}
                </Descriptions.Item>
                {/* {console.log(4, props.userData.id)} */}
              </Descriptions>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Space>
              <Button
                style={buttonStyle}
                onClick={id => {
                  navigate('update');
                }}
              >
                Update Profile
              </Button>
              <Button
                onClick={() => {
                  navigate('change');
                }}
              >
                Change Password
              </Button>
            </Space>
          </Row>
        </Col>
      </Content>
    </>
  );
};
export default ViewProfile;
