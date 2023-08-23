import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../shared/services/http-client';
import { Navigate, useNavigate } from 'react-router';
const { Option } = Select;

const Content = styled.div`
  margin: 15px 16px;
  padding: 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  .ant-form-item .ant-input,
  .ant-form-item .ant-select {
    width: 299px;
    height: 36px;
  }
  button {
    width: 80px;
    height: 33px;
  }
  .ant-form-vertical .ant-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .ant-form-vertical .ant-form-item:last-child {
    padding-top: 10px;
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

const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};

export default function AddDevice() {
  const [status, setStatus] = useState('active');
  const [categories, setCategories] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/categories').then(res => {
      setCategories(res.data);
    });
  }, []);

  const categoryOptions = () => {
    if (!categories) {
      return null;
    }
    return categories.map(category => (
      <Option key={category.id} value={category.id}>
        {category.attributes.name}
      </Option>
    ));
  };

  const filterOption = (input, option) => {
    if (option?.children) {
      return option.children
        .toString()
        .toLowerCase()
        .includes(input.toLowerCase());
    }
    return false;
  };

  const handleSubmit = async values => {
    // event.preventDefault();
    const data = {
      data: {
        name: values.name,
        code: values.code,
        status: status,
        category: values.category,
        address: values.address,
      },
    };

    // console.log(55, data);
    await axiosInstance
      .post('/devices', data)
      .then(res => {
        notification.success({
          message: 'Tạo thành công',
          description: `Tạo thành công ${res.data.attributes.name}.`,
        });
        navigate('/admin/device_list');
      })
      .catch(e => {
        // console.log(11, e);
        notification.error({
          message: 'Lỗi',
          description: `Lỗi ${e.response.data.error.details.errors[0].path} ${e.response.data.error.details.errors[0].message}.`,
        });
      });
  };

  const handleGetStatus = e => {
    setStatus(e);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'All Device',
              href: '/device_list',
            },
            {
              title: <b>Add a new device</b>,
              href: '',
            },
          ]}
        />
      </PathName>
      <Content>
        <Form
          layout={'vertical'}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Space>
            <Form.Item
              name="code"
              label="Code"
              rules={[
                { required: true, message: 'Please enter device code' },
                {
                  pattern: /^([a-zA-Z]{3})_([0-9]{2})$/,
                  message: 'Format must be XXX_YY with YY being 2 numbers',
                },
              ]}
            >
              <Input placeholder="Enter device code" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'string',
                  min: 6,
                },
              ]}
            >
              <Input placeholder="Enter device name" />
            </Form.Item>
            <Form.Item label="Status" name="status">
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
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select
              placeholder="Chọn danh mục"
              // mode="multiple" // Cho phép chọn nhiều danh mục
              showSearch
              filterOption={filterOption}
              // style={{ width: '100%', maxWidth: '400px' }}
            >
              {categoryOptions()}
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input Intro' }]}
            style={{ width: '100%', height: 120, paddingBottom: 10 }}
          >
            <Input.TextArea style={{ width: '100%', height: 120 }} />
          </Form.Item>
          <Form.Item>
            <Row>
              <Divider />
              <Space>
                <Button style={buttonStyle} htmlType="submit">
                  Save
                </Button>
                {contextHolder}
                {/* <Button style={buttonStyle}>Save Fake</Button> */}
                <Button
                  onClick={() => {
                    navigate('/admin/device_list');
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}
