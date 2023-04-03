import React from 'react';
import styled from 'styled-components'
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../components/AppRoutes/AppRoutes';
import axiosInstance from '../../../shared/services/http-client';
import { ACCESS_TOKEN } from '../../../shared/constants';

const isLogin = false;
const LoginBg = styled.div`
    height:100vh;
    width:100vw;
    align-items:center;
`

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const passWord = document.getElementById('passWord').value;
    console.log(email + " " + passWord);
    const data = {
      "identifier": `${email}`,
      "password": `${passWord}`
    }
    axiosInstance.post("auth/local", data).then((res) => {
      console.log(res);
      // navigate('/dashboard');

      // console.log(a);
    }).

      catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message)
      })
  }
  return (
    <LoginBg>

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
            <Input placeholder="Enter email" id='email' />
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
            <Input.Password placeholder="Enter password" id='passWord' />
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
    </LoginBg>
  );
};
export default Login;
