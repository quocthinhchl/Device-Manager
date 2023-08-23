import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../shared/services/http-client';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
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

export default function EditDevice() {
  const [categories, setCategories] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deviceDetail, setDeviceDetail] = useState('');
  const [form] = Form.useForm();
  const [defaultValues, setDefaultValues] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/devices/${id}?populate=category`).then(res => {
      setDeviceDetail(res.data);
    });
    axiosInstance.get('/categories').then(res => {
      setCategories(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (deviceDetail) {
      form.setFieldsValue({
        code: deviceDetail.attributes.code,
        name: deviceDetail.attributes.name,
        status: deviceDetail.attributes.status,
        category: deviceDetail.attributes.category.data?.id,
        address: deviceDetail.attributes.address,
      });
    }
  }, [deviceDetail, form]);

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

  const showModal = values => {
    setIsModalVisible(true);
    setDefaultValues({
      code: values.code,
      name: values.name,
      status: values.status,
      category: values.category,
      address: values.address,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    var data = {
      data: {
        code: defaultValues.code,
        name: defaultValues.name,
        status: defaultValues.status,
        category: defaultValues.category,
        address: defaultValues.address,
      },
    };

    //   console.log(data);
    await axiosInstance
      .put(`/devices/${id}`, data)
      .then(res => {
        notification.success({
          message: 'Chỉnh sửa thành công',
          description: `Chỉnh sửa thành công ${res.data.attributes.name}.`,
        });
        navigate(`/admin/device_list/detail/${id}`);
      })
      .catch(e => {
        // console.log(11, e);
        notification.error({
          message: 'Lỗi',
          description: `Lỗi ${e.response.data.error.details.errors[0].path} ${e.response.data.error.details.errors[0].message}.`,
        });
      });
  };

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/admin/device_list">All Device</Link>,
            },
            {
              title: (
                <Link to={`/admin/device_list/edit/${id}`}>
                  {deviceDetail.attributes?.name}
                </Link>
              ),
            },
          ]}
        />
      </PathName>
      <Content>
        <Form layout={'vertical'} onFinish={showModal} form={form}>
          <Space>
            <Form.Item
              name="code"
              label="Code"
              rules={[
                { required: true, message: 'Please enter device code' },
                {
                  pattern: /^([a-zA-Z]{3})_([0-9]{2})$/,
                  message: 'format must be XXX_YY with YY being 2 numbers)',
                },
              ]}
            >
              <Input placeholder="Enter device code" disabled />
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
              <Input placeholder="Enter device name" name="name" />
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
            name="address"
            label="Address"
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
      </Content>
    </>
  );
}
