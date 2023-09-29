import {
  Button,
  Divider,
  Row,
  Space,
  notification,
  Descriptions,
  Breadcrumb,
  Modal,
  Form,
  Input,
  DatePicker,
  Avatar,
  QRCode,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../shared/services/http-client';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';
import moment from 'moment/moment';
import { API } from '../../../../shared/constants';

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

export default function UserDeviceDetail() {
  const [deviceDetail, setDeviceDetail] = useState('');
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const userProfile = useSelector(UserProfile);
  const QRlocation = useLocation();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    axiosInstance
      .get(`/devices/${id}?populate=category,image`)
      .then(res => {
        setDeviceDetail(res.data);
      })
      .catch(error => {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }, [id]);

  useEffect(() => {
    if (deviceDetail) {
      form.setFieldsValue({
        code: deviceDetail.attributes.code,
        name: deviceDetail.attributes.name,
      });
    }
  }, [deviceDetail, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeBorrowDate = (date, dateString) => {
    setBorrowDate(dateString);
  };

  const onChangeReturnDate = (date, dateString) => {
    setReturnDate(dateString);
  };

  const handleBorrowRequest = async () => {
    try {
      await form.validateFields();
      const data = {
        data: {
          user: userProfile.user_profile.id,
          device: id,
          location: location,
          borrow_date: borrowDate,
          return_date: returnDate,
          status: 'Chờ',
        },
      };

      // console.log(data);
      axiosInstance
        .post(`/borrow-requests`, data)
        .then(res => {
          axiosInstance.put(`devices/${id}`, {
            data: {
              status: 'Đang mượn',
            },
          });
          notification.success({
            message: 'Gửi yêu cầu mượn thành công',
          });
          navigate('/user/device_list');
        })
        .catch(error => {
          notification.error({
            message: error.message,
            description: 'Có lỗi xảy ra, vui lòng thử lại',
          });
        });

      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/device_list">All Device</Link>,
            },
            {
              title: (
                <Link to={`/device_list/detail/${id}`}>
                  {deviceDetail.attributes?.name}
                </Link>
              ),
            },
          ]}
        />
      </PathName>
      <Content>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '40px', flex: '1' }}>
            <Avatar
              size={230}
              shape="square"
              src={`${API}${deviceDetail.attributes?.image?.data?.attributes.url}`}
            />
          </div>
          <div style={{ marginRight: '20px', flex: '2' }}>
            <Descriptions layout="vertical" column={3}>
              <Descriptions.Item label="Mã thiết bị">
                {deviceDetail.attributes?.code}
              </Descriptions.Item>
              <Descriptions.Item label="Tên thiết bị">
                {deviceDetail.attributes?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {deviceDetail.attributes?.status}
              </Descriptions.Item>
              <Descriptions.Item label="Loại thiết bị">
                {deviceDetail.attributes?.category.data?.attributes.name}
              </Descriptions.Item>
              <Descriptions.Item label="Vị trí" span={2}>
                {deviceDetail.attributes?.location}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={3}>
                {deviceDetail.attributes?.description}
              </Descriptions.Item>
              <Descriptions.Item label="QR code" span={3}>
                <QRCode value={API + QRlocation.pathname} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>

        <Row>
          <Divider />
          <Space>
            <Button style={buttonStyle} onClick={showModal}>
              Borrow
            </Button>
            <Button onClick={() => navigate('/user/device_list')}>
              Cancel
            </Button>
          </Space>
        </Row>
        <Modal
          title={`Bạn có muốn mượn ${deviceDetail?.attributes?.name} không?`}
          visible={isModalVisible}
          onOk={handleBorrowRequest}
          onCancel={handleCancel}
          okText="Mượn"
          cancelText="Huỷ"
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Mã thiết bị" name="code">
              <Input name="code" disabled />
            </Form.Item>
            <Form.Item label="Tên thiết bị" name="name">
              <Input name="name" disabled />
            </Form.Item>
            <Form.Item
              label="Vị trí"
              name="location"
              rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
            >
              <Input
                placeholder="Please input location"
                onChange={e => setLocation(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Ngày mượn"
              name="borrow_date"
              rules={[
                { required: true, message: 'Vui lòng nhập ngày mượn!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.isAfter(moment(), 'day')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Ngày mượn phải ở tương lai')
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                picker="date"
                placeholder="YY-MM-DD"
                onChange={onChangeBorrowDate}
              />
            </Form.Item>
            <Form.Item
              label="Ngày trả"
              name="return_date"
              rules={[
                { required: true, message: 'Vui lòng nhập ngày trả!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.isAfter(moment(), 'day')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Ngày trả phải ở tương lai')
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                picker="date"
                placeholder="YY-MM-DD"
                onChange={onChangeReturnDate}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </>
  );
}
