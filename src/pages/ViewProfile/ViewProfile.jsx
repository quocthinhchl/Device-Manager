import React, { useState } from "react";
import { Layout, Menu, theme, Descriptions, Col, Avatar, Row, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons'
const { Header, Sider, Content } = Layout;
const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsj7e0UFTEaWkuKIk__YXeQpDgi8BOQq3CUg&usqp=CAU';
const ViewProfile = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <h5 style={{ margin: '10px 25px 0px 20px' }}>My Profile</h5>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: colorBgContainer,
                    display: "flex",
                    flexDirection: "collumn",
                    maxHeight: 320,
                }}
            >
                <Col>
                    <Row>
                        <Col span={8} style={{
                            paddingLeft: 100,
                            flexGrow: 1
                        }}>
                            <Avatar size={200} src={url} />
                        </Col>
                        <Col span={16} style={{
                            paddingLeft: 150,
                            flexGrow: 1
                        }}>
                            <Descriptions title="" layout="vertical" column={2}>
                                <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
                                <Descriptions.Item label="Email">1810000000</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">Hangzhou, Zhejiang</Descriptions.Item>
                                <Descriptions.Item label="DOB">25/01/1992</Descriptions.Item>
                                <Descriptions.Item label="Address">
                                    Cau Giay, Ha noi
                                </Descriptions.Item>
                                <Descriptions.Item label="Role">empty</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row>
                        <Space>
                            <Button type="primary">Primary Button</Button>
                            <Button>Default Button</Button>
                        </Space>
                    </Row>
                </Col>
            </Content>
        </>

    );
}
export default ViewProfile