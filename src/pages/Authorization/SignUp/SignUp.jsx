import { Button, Form, Image, Input, Row, notification } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
import { useNavigate } from 'react-router';

const LoginBg = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  .ant-image {
    margin: 2rem 0;
    width: 240px;
  }

  .ant-row form {
    background: #ffffff;
    box-shadow: 0px 4px 55px rgba(0, 0, 0, 0.07);
    border-radius: 16px;
    padding: 20px;
  }

  .ant-row .ant-form .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-row .ant-form .Login {
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    color: #ff9c00;
    /* transition: color 0.3s ease; */
  }
  .ant-row .ant-form .Login:hover {
    color: #4096ff;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
`;

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

export const SignUp = () => {
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleSubmit = values => {
    const data = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      password: values.password,
      role: 2,
      // confirmed: true,
      blocked: false,
    };

    //   console.log(22, data);
    axiosInstance
      .post('/users', data)
      .then(response => {
        if (response != null) {
          navigate('/');
          // logOut()
          notification.success({
            message: 'Tạo tài khoản thành công',
          });
        }
      })
      .catch(error => {
        notification.error({
          message: error.response.data.error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  };

  return (
    <>
      <LoginBg>
        <Row justify="center">
          <Form
            name="basic"
            layout="vertical"
            form={form}
            style={{
              width: 400,
              margin: 32,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title>
              <h1>Create Account</h1>
            </Title>

            <Form.Item
              label="Name"
              name="fullname"
              rules={[
                {
                  required: true,

                  message: 'Please input owner Name!',
                },
              ]}
            >
              <Input size="default size" placeholder="Enter owner Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your Email!',
                },
                { whitespace: false },
              ]}
            >
              <Input placeholder="Enter email" id="email" />
            </Form.Item>

            <Form.Item
              label="UserName"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your UserName!',
                },
                { whitespace: false },
              ]}
            >
              <Input placeholder="Enter UserName" id="username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
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
                placeholder="Enter password"
                id="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator(_, value) {
                    if (!value || password === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered does not match.'
                    );
                  },
                },
              ]}
            >
              <Input.Password placeholder="Enter password" id="password" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                // offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 360, marginTop: 10 }}
              >
                SignUp
              </Button>
            </Form.Item>
            <p
              className="Login"
              onClick={() => {
                navigate('/');
              }}
            >
              Had Account? Login
            </p>
          </Form>
        </Row>
      </LoginBg>
    </>
  );
};
