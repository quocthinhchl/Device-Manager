import { Button, Col, Divider, Form, Input, Row, Select, Space, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from "../../../shared/services/http-client";
import { Navigate, useNavigate } from "react-router";

const Content = styled.div`
    margin: 15px 16px;
    padding: 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius:10px;
    overflow: hidden;
    .ant-form-item .ant-input,.ant-form-item .ant-select{
        width: 299px;
        height: 36px;
    }
    button{
        width: 80px;
        height: 33px;
    }
    .ant-form-vertical .ant-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
`;


export default function AddDevice() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('active')
    const [address, setAddress] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const buttonStyle = {
        backgroundColor: '#8767E1',
        color: '#fff',
    };
    const key = 'updatable';

    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description: 'description.',
        });
        setTimeout(() => {
            api.open({
                key,
                message: 'New Title',
                description: 'New description.',
            });
        }, 1000);
    };
    async function createDevice() {
        const openNotification = () => {
            api.open({
                message: 'Notification Title',
                description: 'description.',
            });
            setTimeout(() => {
                api.open({
                    key,
                    message: 'New Title',
                    description: 'New description.',
                });
            }, 1000);
        };
        const data = {
            data: {
                name: name,
                code: code,
                status: status,
                address: address,
            }
        }
        await axiosInstance.post("/devices", data).catch((e) => console.log(e))
        // navigate("/dashboard/users")
        console.log(111, data);
    }
    const handleGetCode = (e) => {
        setCode(e.target.value)
    };

    const handleGetName = (e) => {
        setName(e.target.value)
    };

    const handleGetStatus = (e) => {
        setStatus('active')
    };

    const handleGetAddress = (e) => {
        setAddress(e.target.value)
    };

    return (
        <Content>
            <Form
                layout={'vertical'}
            >
                <Row>
                    <Space size="middle">
                        <Form.Item name='code' label="Code" rules={[{ required: true, message: 'Please enter device code' }, {
                            pattern: /^([a-zA-Z]{3})_([0-9]{2})$/,
                            message: 'Hay nhap theo format XXX_YY voi YY la 2 so)'
                        }
                        ]}>
                            <Input placeholder="Enter device code"
                                onChange={handleGetCode}
                            />
                        </Form.Item>
                        <Form.Item name='name' label="Name" rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string',
                                min: 6,
                            },
                        ]}>
                            <Input placeholder="Enter device name"
                                onChange={handleGetName}
                            />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Select
                                placeholder="Select a status"
                                options={[
                                    {
                                        value: 'active',
                                        label: 'Active',
                                    },
                                    {
                                        value: 'inactive',
                                        label: 'Inactive',
                                    },
                                ]}
                                defaultValue={'active'}
                                onChange={handleGetStatus}

                            />
                        </Form.Item>
                    </Space>
                </Row>
                <Row>
                    <Form.Item
                        name="intro"
                        label='Address'
                        rules={[{ required: true, message: 'Please input Intro' }]}
                        style={{ width: '100%', height: 120 }}
                    >
                        <Input.TextArea style={{ width: '100%', height: 120 }} onChange={handleGetAddress} />
                    </Form.Item>
                </Row>
            </Form>
            <Divider />
            <Row>
                <Space>
                    <Button style={buttonStyle} onClick={createDevice}>Save</Button>
                    {contextHolder}
                    <Button style={buttonStyle} onClick={openNotification}>Save Fake</Button>
                    <Button >Cancel</Button>
                </Space>
            </Row>
        </Content >
    )
}