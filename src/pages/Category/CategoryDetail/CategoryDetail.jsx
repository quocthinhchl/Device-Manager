import {
  Button,
  Divider,
  Row,
  Space,
  notification,
  Descriptions,
  Breadcrumb,
  Modal,
  List,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../shared/services/http-client';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

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

const DevicesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

const Devices = styled.div`
  width: 1071px;
  height: 215px;
  background: #fffffe;
  /* Neutral Dark/5 */

  border: 1px solid #dde4ee;
  border-radius: 8px;
`;

const Text = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #805edf;
  margin: 0;
`;

const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};

export default function CategoryDetail() {
  const [categoryDetail, setCategoryDetail] = useState('');
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [device, setDevice] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/categories/${id}?populate=devices`)
      .then(res => {
        setCategoryDetail(res.data);
        setDevice(res.data.attributes.devices.data);
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
    navigate(`/admin/category_list/edit/${id}`);
  };

  const handleDelete = async () => {
    axiosInstance
      .delete(`/categories/${id}`)
      .then(() => {
        notification.success({
          message: 'Xóa thành công',
          description: `Xóa thành công ${categoryDetail.attributes?.name}`,
        });
        navigate('/admin/category_list');
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
              title: <Link to="/admin/category_list">All Category</Link>,
            },
            {
              title: (
                <Link to={`/admin/category_list/detail/${id}`}>
                  {categoryDetail.attributes?.name}
                </Link>
              ),
            },
          ]}
        />
      </PathName>
      <Content>
        <Descriptions
          layout="vertical"
          column={3}
          labelStyle={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '24px',
            color: '#939393',
            margin: 0,
          }}
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          <Descriptions.Item label="Code">
            {categoryDetail.attributes?.code}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {categoryDetail.attributes?.name}
          </Descriptions.Item>
        </Descriptions>

        <DevicesList>
          <p
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '24px',
              color: '#939393',
              margin: 0,
            }}
          >
            Devices:
          </p>
          <Devices>
            <List
              style={{
                height: 200,
                overflowY: 'auto',
              }}
              itemLayout="horizontal"
              dataSource={device}
              renderItem={item => (
                <List.Item
                  style={{
                    border: 'none',
                    padding: '16px 0 0 16px',
                  }}
                >
                  <List.Item.Meta
                    style={{}}
                    title={
                      <Text key={item.attributes.id}>
                        {item.attributes.name}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Devices>
        </DevicesList>

        <Row>
          <Divider />
          <Space>
            <Button style={buttonStyle} onClick={handleEdit}>
              Edit
            </Button>
            <Button onClick={showModal}>Delete</Button>
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
