import React from 'react';

import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../components/AppRoutes/AppRoutes';

const isLogin = false;

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {


    navigate('/dashboard');
  }
  return (
    <Row justify="center">
      <Form
        name="basic"
        layout="vertical"
        style={{
          width: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>Welcome</h1>
        <p>Log in to your account</p>
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
export default Login;
