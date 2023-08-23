import React, { useState } from 'react';
import {
  Layout,
  theme,
  Button,
  Space,
  Input,
  Form,
  Divider,
  message,
  notification,
} from 'antd';
// import { Content } from "antd/es/layout/layout";
import { useNavigate, Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';

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

  border-radius: 10px;
`;
const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};

const ChangePass = props => {
  const navigate = useNavigate();
  const onFinish = values => {
    const data = {
      currentPassword: values.current_password,
      password: values.new_password,
      passwordConfirmation: values.confirm_password,
    };
    axiosInstance
      .post('/auth/change-password', data)
      .then(response => {
        if (response != null) {
          navigate('/myprofile');
          // logOut()
          notification.success({
            message: 'Thay đổi mật khẩu thành công',
            description: 'Cập nhật thông tin thành công',
          });
        }
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: error.response.data.error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  };

  return (
    <>
      <PathName>Change password</PathName>
      <Content
        style={{
          width: '35%',
        }}
      >
        <p>Now you can create a new password for your account</p>
        <Form autoComplete="off" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Current Password "
            name="current_password"
            rules={[
              { required: true, message: 'Input Your Password' },

              {
                pattern: new RegExp(
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                ),
                message:
                  ' Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!',
              },
            ]}
          >
            <Input.Password
              placeholder="Type your password"
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            label="New Password"
            rules={[
              {
                required: true,
                message: ' Input Your New Password',
              },

              {
                pattern: new RegExp(
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                ),
                message:
                  ' Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!',
              },
            ]}
          >
            <Input.Password
              placeholder="Type your password"
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: ' Input Your Confirm Password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered does not match.'
                  );
                },
              }),
              {
                pattern: new RegExp(
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                ),
                message:
                  ' Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!',
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Divider />

          <Form.Item wrapperCol={{ span: 24 }}>
            <Space>
              <Button block style={buttonStyle} htmlType="submit">
                Submit
              </Button>
              <Button
                onClick={() => {
                  navigate('/myprofile');
                }}
              >
                Back
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default ChangePass;
