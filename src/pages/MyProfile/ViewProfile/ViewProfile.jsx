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
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../shared/services/http-client';
const url =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';

const ViewProfile = () => {
    const [useUser, setUser] = useState()
    useEffect(() => {
        axiosInstance.get("/users/me?populate=role,avatar").then(res => {
            setUser(res);
        })
    }, {});
    console.log(11111);
    const buttonStyle = {
        backgroundColor: '#8767E1',
        color: '#fff',
    };
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
    border-radius:10px;
    
  `;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    console.log(useUser);
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
                            <Avatar size={200} src={url} />
                        </Col>
                        <Col
                            span={16}
                            style={{
                                paddingLeft: 150,
                                flexGrow: 1,
                            }}
                        >
                            <Descriptions title="" layout="vertical" column={2}>
                                <Descriptions.Item label="Name">{useUser.fullname}</Descriptions.Item>
                                <Descriptions.Item label="Email">{useUser.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{useUser.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="DOB">{useUser.dob}</Descriptions.Item>
                                <Descriptions.Item label="Address">
                                    Cau Giay, Ha noi
                                </Descriptions.Item>
                                <Descriptions.Item label="Role"></Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Space>

                            <Button style={buttonStyle} onClick={() => {
                                navigate("update");
                            }}>Update Profile</Button>
                            <Button onClick={() => {
                                navigate("change");
                            }} >Change Password</Button>
                        </Space>
                    </Row>
                </Col>
            </Content>
        </>
    );
};
export default ViewProfile;
