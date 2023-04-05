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
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-row form{
      /* width: 488px;
      height: 488px; */
      background: #FFFFFF;
      box-shadow: 0px 4px 55px rgba(0, 0, 0, 0.07);
      border-radius: 16px;
    }
    
`
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center; 
    
    .h1{
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
`

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log(email + " " + password);
    const data = {
      "identifier": `${email}`,
      "password": `${password}`
    }
    axiosInstance.post("auth/local", data).then((res) => {
      let a = []
      a = res

      if (ACCESS_TOKEN === 'null') {
        console.log(33);
      }
      // ACCESS_TOKEN = 'test'
      console.log(ACCESS_TOKEN);

      navigate('/dashboard');
    }).

      catch((error) => {
        console.log(error.response.data.error.message);
        // alert(error.response.data.error.message)
        // navigate('/dashboard');
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
            margin: 32
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Title>
            <h1>Welcome</h1>
            <p>Log in to your account</p>
          </Title>

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
            <Input.Password placeholder="Enter password" id='password' />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              // offset: 8,
              span: 16,
            }}

          >
            <Button type="primary" htmlType="submit" style={{ width: 400, }} >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </LoginBg>
  );
};
export default Login;
