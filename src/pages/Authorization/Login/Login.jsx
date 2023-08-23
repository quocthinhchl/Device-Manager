import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Row, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/services/http-client';
import { useDispatch } from 'react-redux';
import { addToken } from '../../../stores/Slice/UserSlice';

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
    margin-bottom: 20px;
  }

  .ant-row .ant-form .signUp {
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    color: #ff9c00;
    /* transition: color 0.3s ease; */
  }
  .ant-row .ant-form .signUp:hover {
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
  .p {
    font-size: 16px;
  }
`;

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

async function loginUser(data) {
  return axiosInstance
    .post('auth/local', data)
    .then(res => res.jwt)
    .catch(error => {
      // alert(error.response.data.error.message);
      notification.error({
        message: error.response.data.error.message,
      });
    });
}

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      identifier,
      password,
    });
    // console.log(token);
    if (token) {
      localStorage.setItem('token', token);
      dispatch(addToken(localStorage.getItem('token')));

      notification.success({
        message: 'Đăng nhập thành công',
      });
    }
  };

  return (
    <LoginBg>
      <Row justify="center">
        <Form
          name="basic"
          layout="vertical"
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
              { whitespace: false },
            ]}
          >
            <Input
              placeholder="Enter email"
              id="email"
              onChange={e => setUserName(e.target.value)}
            />
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
            wrapperCol={{
              // offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 360, margin: '10px 0 0 0' }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form.Item>

          <p
            className="signUp"
            onClick={() => {
              navigate('/sign_up');
            }}
          >
            Create Account
          </p>
        </Form>
      </Row>
    </LoginBg>
  );
};
export default Login;
