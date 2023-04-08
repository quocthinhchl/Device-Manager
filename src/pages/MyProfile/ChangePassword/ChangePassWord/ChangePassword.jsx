/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import {
  Layout,
  
  theme,
  
  Button,
  Space,
  Input,
  Form,
  Divider,
  
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
    const Content = styled.div`
    margin: 15px 16px;
    padding: 24px;
    background: #ffffff;
    
    border-radius:10px
    
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
             
          width: "35%",
          
        }}
      >
        
        
        
          <p>Now you can create a new password for your acconut</p>
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
              label="Current Password "
              name={"Password"}
              rules={[
                { required: true, message: "Input Your Password" },
                
                {
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                  ),
                  message:
                    " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
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
              label="New Password"
              rules={[
                {
                  required: true,
                  message:
                    " Input Your New Password",
                },
                
                // {
                //   validator: (_, value) =>
                //     value && value.includes("A")
                //       ? Promise.resolve()
                //       : Promise.reject("Password does not match criteria."),
                // },
                {
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                  ),
                  message:
                    " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
              
            >
              <Input.Password placeholder="Type your password" iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                } />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message:
                    " Input Your Confirm Password",
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
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                  ),
                  message:
                    " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
                },
              ]}
              
            >
              <Input.Password placeholder="Confirm your password" iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                } />
            </Form.Item>
            <Divider />

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
      
      </Content>
    </>
  );
};
export default ChangePass;
