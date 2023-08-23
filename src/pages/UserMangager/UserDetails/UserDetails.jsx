import {
  Breadcrumb,
  Button,
  Descriptions,
  List,
  Modal,
  Row,
  Skeleton,
  Space,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../stores/Slice/UserSlice';
import { Link } from 'react-router-dom';

const PathName = styled.p`
  margin: 10px 25px 0px 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #111111;
`;
const Content = styled.div`
  margin: 15px 16px;
  padding: 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
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

export default function UserDetails() {
  const [user, setUser] = useState('');
  const [DVS, setDVS] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const userProfile = useSelector(UserProfile);

  useEffect(() => {
    axiosInstance
      .get(`users/${id}?populate=devices,role`)
      .then(res => {
        setUser(res);
        setDVS(res.devices);
      })
      .catch(error => {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await axiosInstance
      .delete(`users/${id}`)
      .then(() => {
        notification.success({
          description: 'Xóa thành công',
        });
      })
      .catch(error => {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });

    setIsModalOpen(false);
    navigate('/admin/users_list');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function HandleDelete() {
    // console.log(id, 'ghjgjghjhgj');
    showModal();
  }

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/admin/users_list">All User</Link>,
            },
            {
              title: <b>{user.fullname}</b>,
              href: '',
            },
          ]}
        />
      </PathName>
      <Content>
        <Descriptions
          title=""
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
          <Descriptions.Item label="Name">{user.fullname}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="DOB">{user.dob}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1)}
          </Descriptions.Item>
          <Descriptions.Item label="Role">{user.role?.name}</Descriptions.Item>
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
              dataSource={DVS}
              renderItem={item => (
                <List.Item
                  style={{
                    border: 'none',
                    padding: '16px 0 0 16px',
                  }}
                >
                  <List.Item.Meta
                    style={{}}
                    title={<Text key={item.id}>{item.name}</Text>}
                  />
                </List.Item>
              )}
            />
          </Devices>
        </DevicesList>

        <Row style={{ borderTop: '1px solid #dcd2d2', marginTop: '32px' }}>
          {userProfile.isAdmin ? (
            <Space style={{ paddingTop: 24 }}>
              <Button
                style={{
                  background: '#8767E1',
                  color: '#F1F4F9',
                }}
                onClick={() => {
                  navigate(`/admin/users_list/edit/${id}`);
                }}
              >
                Edit
              </Button>

              <Button
                style={{
                  color: 'rgb(135, 103, 225)',
                }}
                onClick={() => {
                  navigate(`/admin/users_list`);
                }}
              >
                Back
              </Button>
              <Button danger onClick={HandleDelete}>
                Delete
              </Button>
            </Space>
          ) : (
            <Space style={{ paddingTop: 24 }}>
              <Button
                style={{
                  color: 'rgb(135, 103, 225)',
                }}
                onClick={() => {
                  navigate(`/admin/users_list`);
                }}
              >
                Back
              </Button>
            </Space>
          )}
        </Row>
      </Content>
      <Modal
        title="Detele"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xoá {user.fullname} không?</p>
      </Modal>
    </>
  );
}
