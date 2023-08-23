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

export default function EditCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState('');
  const [devices, setDevices] = useState('');
  const [defaultValues, setDefaultValues] = useState({});
  const [form] = Form.useForm();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/categories/${id}?populate=devices`).then(res => {
      setCategoryDetail(res.data);
    });
    axiosInstance
      .get(`/devices?filters[status][$eq]=active`)
      .then(res => {
        setDevices(res.data);
      })
      .catch(error => {
        // console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui  lòng thử lại',
        });
      });
  }, [id]);

  useEffect(() => {
    if (categoryDetail) {
      form.setFieldsValue({
        code: categoryDetail.attributes.code,
        name: categoryDetail.attributes.name,
        devices: categoryDetail.attributes.devices.data?.map(item => item.id),
      });
    }
  }, [categoryDetail, form]);

  const deviceOptions = () => {
    if (!devices) {
      return null;
    }
    return devices.map(device => (
      <Option key={device.id} value={device.id}>
        {device.attributes.name}
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
      devices: values.devices,
    });

    // console.log(44, defaultValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const data = {
      data: {
        code: defaultValues.code,
        name: defaultValues.name,
        devices: defaultValues.devices,
      },
    };

    axiosInstance
      .put(`/categories/${id}`, data)
      .then(response => {
        notification.success({
          message: 'Cập nhật thành công',
          description: `Cập nhật thành công ${response.data.attributes.name}.`,
        });
        navigate(`/dashboard/admin/category_list/detail/${id}`);
      })
      .catch(error => {
        notification.error({
          message: error.error.name,
          description: 'Có lỗi xảy ra vui lòng thử lại',
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
              title: <Link to="/dashboard/device_list">All Device</Link>,
            },
            {
              title: (
                <Link to={`/dashboard/device_list/edit/${id}`}>
                  {categoryDetail.attributes?.name}
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
          </Space>

          <Form.Item
            label="Device"
            name="devices"
            // rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select
              placeholder="Chọn danh mục"
              mode="multiple" // Cho phép chọn nhiều danh mục
              showSearch // Hiển thị thanh tìm kiếm
              filterOption={filterOption}
              style={{ width: '100%', maxWidth: '400px' }}
            >
              {deviceOptions()}
            </Select>
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
                    navigate('/dashboard/admin/category_list');
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
          open={isModalVisible}
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
