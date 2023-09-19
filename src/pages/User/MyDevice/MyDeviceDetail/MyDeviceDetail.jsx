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
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../shared/services/http-client';
import { Navigate, useNavigate, useParams } from 'react-router';
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

export default function MyDeviceDetail() {
  const [deviceDetail, setDeviceDetail] = useState('');
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [repairData, setRepairData] = useState({
    location: '',
    description: '',
  });
  const userProfile = useSelector(UserProfile);
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    axiosInstance
      .get(`/devices/${id}?populate=category`)
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

  const onChangeRepairData = (name, value) => {
    setRepairData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRepairRequest = async () => {
    try {
      await form.validateFields();
      const data = {
        data: {
          user: userProfile.user_profile.id,
          device: id,
          location: repairData.location,
          description: repairData.description,
          status: 'Chờ',
        },
      };

      // console.log(data);
      axiosInstance
        .post(`/repair-requests`, data)
        .then(res => {
          axiosInstance.put(`devices/${id}`, {
            data: {
              status: 'Hỏng',
            },
          });
          notification.success({
            message: 'Gửi yêu cầu sửa chữa thành công',
          });
          navigate('/user/my_device');
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
              <Descriptions.Item label="Code">
                {deviceDetail.attributes?.code}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {deviceDetail.attributes?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {deviceDetail.attributes?.status}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {deviceDetail.attributes?.category.data?.attributes.name}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {deviceDetail.attributes?.location}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <Row>
          <Divider />
          <Space>
            <Button type="primary" onClick={showModal}>
              Failure report
            </Button>
            <Button onClick={() => navigate('/user/device_list')}>
              Cancel
            </Button>
          </Space>
        </Row>
        <Modal
          title="Thông báo sửa chữa"
          open={isModalVisible}
          onOk={handleRepairRequest}
          onCancel={handleCancel}
          okText="Report"
          cancelText="Cancel"
        >
          <Form
            form={form}
            name="basic"
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
              rules={[
                {
                  required: true,
                  message: 'Vui long nhập vị trí của thiết bị',
                },
              ]}
            >
              <Input
                placeholder="Nhập vị trí của thiết bị"
                onChange={e => onChangeRepairData('location', e.target.value)}
                value={repairData.location}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả tình trạng thiết bị',
                },
              ]}
            >
              <Input
                placeholder="Nhập mô tả tình trạng thiết bị"
                onChange={e =>
                  onChangeRepairData('description', e.target.value)
                }
                value={repairData.description}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </>
  );
}
