import { Breadcrumb, Button, Col, Divider, Form, Input, Modal, Row, Select, Space, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from "../../../shared/services/http-client";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

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
    .ant-form-vertical .ant-form-item:last-child{
        padding-top: 10px
    }
`;
const PathName = styled.p`
    margin: 10px 25px 0px 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 32px;
    color: #111111;
  `;
export default function EditDevice() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('active')
    const [address, setAddress] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deviceDetail, setDeviceDetail] = useState('');
    const [form] = Form.useForm();
    const [defaultValues, setDefaultValues] = useState({});

    const { id } = useParams()
    const navigate = useNavigate();

    var data = {
        data: {
            name,
            code,
            status,
            address,
        }
    }
    useEffect(() => {
        axiosInstance.get(`/devices/${id}?populate=user.avatar`).then((res) => {
            setDeviceDetail(res.data)
        })
    }, [id])
    useEffect(() => {
        if (deviceDetail) {
            form.setFieldsValue({
                code: deviceDetail.attributes.code,
                name: deviceDetail.attributes.name,
                status: deviceDetail.attributes.status,
                address: deviceDetail.attributes.address,
            })
        }
    }, [deviceDetail, form])

    const showModal = (values) => {
        setIsModalVisible(true);
        setDefaultValues({
            code: values.code,
            name: values.name,
            status: values.status,
            address: values.address,
        });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSubmit = async () => {
        try {
            data = {
                data: {
                    code: defaultValues.code,
                    name: defaultValues.name,
                    status: defaultValues.status,
                    address: defaultValues.address,
                }
            }
            const response = await axiosInstance.put(`/devices/${id}`, data).catch((e) => {
                notification.error({
                    message: e.message,
                    description: `Lỗi.`,
                });
            })
            notification.success({
                message: 'Cập nhật thành công',
                description: `Cập nhật thành công ${response.data.attributes.name}.`,
            });
            navigate('/dashboard/device_list');
        }
        catch (error) {
            notification.error({
                message: 'Không thể tạo',
                description: error.error.name,
            });
        }
    };

    const buttonStyle = {
        backgroundColor: '#8767E1',
        color: '#fff',
    };
    return (
        <>
            <PathName>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to='/dashboard/device_list'>All Device</Link>,
                        },
                        {
                            title: <Link to={`/dashboard/device_list/edit/${id}`}>{deviceDetail.attributes?.name}</Link>,

                        },
                    ]}
                />
            </PathName>
            <Content>
                <Form
                    layout={'vertical'}
                    onFinish={showModal}
                    form={form}
                >
                    <Space >
                        <Form.Item name='code' label="Code" rules={[{ required: true, message: 'Please enter device code' }, {
                            pattern: /^([a-zA-Z]{3})_([0-9]{2})$/,
                            message: 'Hay nhap theo format XXX_YY voi YY la 2 so)'
                        }
                        ]}>
                            <Input placeholder="Enter device code"
                                disabled
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
                                name="name"
                            />
                        </Form.Item>
                        <Form.Item label="Status" name='status'>
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
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        name="address"
                        label='Address'
                        rules={[{ required: true, message: 'Please input Intro' }]}
                        style={{ width: '100%', height: 120, paddingBottom: 10 }}
                    >

                        <Input.TextArea style={{ width: '100%', height: 120 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Divider />
                            <Space>
                                <Button style={buttonStyle} htmlType="submit">Save</Button>
                                <Button onClick={() => { navigate('/dashboard/device_list') }}>Cancel</Button>
                            </Space>
                        </Row>
                    </Form.Item>
                </Form>
                <Modal
                    title="Xác nhận chỉnh sửa"
                    visible={isModalVisible}
                    onOk={handleSubmit}
                    onCancel={handleCancel}
                    okText="Đồng ý"
                    cancelText="Hủy bỏ"
                >
                    <p>Bạn có chắc muốn chỉnh sửa không không?</p>
                </Modal>
            </Content >
        </>
    )
}
