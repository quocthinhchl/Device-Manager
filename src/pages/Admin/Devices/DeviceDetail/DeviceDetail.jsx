import {
  Button,
  Divider,
  Row,
  Space,
  notification,
  Descriptions,
  Breadcrumb,
  Modal,
  Avatar,
  QRCode,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../shared/services/http-client';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
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

export default function DeviceDetail() {
  const [deviceDetail, setDeviceDetail] = useState('');
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const { id } = useParams();

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    navigate(`/admin/device_list/edit/${id}`);
  };

  const handleDelete = async () => {
    axiosInstance
      .delete(`/devices/${id}`)
      .then(() => {
        notification.success({
          message: 'Xóa thành công',
          description: `Xóa thành công ${deviceDetail.attributes?.name}`,
        });
        navigate('/admin/device_list');
      })
      .catch(e => {
        notification.error({
          message: e.error.message,
          description: `Có lỗi xảy ra vui lòng thử lại.`,
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
              title: <Link to="/device_list">Quản lý thiết bị</Link>,
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
              src={deviceDetail.attributes?.image?.data?.attributes.url}
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
                <QRCode value={API + location.pathname} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>

        <Row>
          <Divider />
          <Space>
            <Button style={buttonStyle} onClick={handleEdit}>
              Edit
            </Button>
            <Button danger onClick={showModal}>
              Delete
            </Button>
            <Button key="back" onClick={() => navigate('/admin/device_list')}>
              Return
            </Button>
          </Space>
        </Row>
        <Modal
          title="Xác nhận xóa"
          visible={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Xóa"
          cancelText="Hủy bỏ"
        >
          <p>Bạn có chắc muốn xóa không?</p>
        </Modal>
      </Content>
    </>
  );
}
