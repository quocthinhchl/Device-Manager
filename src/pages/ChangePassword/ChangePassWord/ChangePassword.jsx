/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import {
  Layout,
  
  theme,
  
  Button,
  Space,
  Input,
  Form,
  
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate, Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styled from "styled-components";



const ChangePass = () => {
    const buttonStyle = {
        backgroundColor: '#8767E1',
        color: '#fff',
    };
    const PathName = styled.p`
    margin: 10px 25px 0px 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 32px;
    color: #111111;
    `;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <>
      <PathName>Change password</PathName>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          height:"100%",

          background: colorBgContainer,
          display: "flex",
          flexDirection: "collumn",
          
        }}
      >
        <div
          style={{
            width: "70%",

            height: "100%",
          }}
        >
          <Form
            autoComplete="off"
            layout="vertical"
            onFinish={(values) => {
              console.log({ values });
            }}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <Form.Item
              label="Old Passord"
              name={"Password"}
              rules={[
                { required: true, message: "Input your Password" },
                { min: 6 },
                {
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/
                  ),
                  message:
                    " Password should be include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
            >
              <Input.Password
                placeholder="Type your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
                { min: 6 },
                {
                  validator: (_, value) =>
                    value && value.includes("A")
                      ? Promise.resolve()
                      : Promise.reject("Password does not match criteria."),
                },
                {
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/
                  ),
                  message:
                    " Password should be include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
              
            >
              <Input.Password placeholder="Type your password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered does not match."
                    );
                  },
                }),
                 {
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/
                  ),
                  message:
                    " Password should be include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
              
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Space>
                <Button block style={buttonStyle } htmlType="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    navigate("/dashboard/users");
                  }}
                >
                  Back
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </>
  );
};
export default ChangePass;
