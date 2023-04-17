/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import {
  theme,
  Button,
  Space,
  Input,
  Form,
  DatePicker,
  Modal,
  Upload,
  message,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";
import { UploadContainer } from "./style";
import axiosInstance from "../../../shared/services/http-client";
import moment from "moment";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return isJpgOrPng;
};

const UpdateProfile = (props) => {

  const buttonStyle = {
    backgroundColor: "#8767E1",
    color: "#fff",
    width: 150,
  };
  const PathName = styled.p`
    margin: 10px 25px 0px 20px;
    font-family: "Poppins";
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://static.vecteezy.com/system/resources/previews/000/290/610/original/administration-vector-icon.jpg",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const defaultDate = moment(props.userData.dob);
  return (
    <>
      <PathName>Update Profile</PathName>
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px  ",

          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "40%",
            paddingLeft: 20,
            flexGrow: 1,
          }}
        >
          <UploadContainer
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </UploadContainer>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
        <div
          style={{
            width: "60%",
            flexGrow: 1,
          }}
        >
          <Form
            id="myForm"
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
              name="fullName"
              label="Full Name:"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                // { whitespace: true },
                { min: 3 },
              ]}
            >
              <Input
                placeholder="Type your name"
                defaultValue={props.userData.fullname}
              />
            </Form.Item>
            <Form.Item name="fullName" label="Username:">
              <Input disabled defaultValue={props.userData.username} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email:"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Type your email"
                value={"hung@gmail.com"}
                defaultValue={props.userData.email}
                disabled
              ></Input>
            </Form.Item>
            <div style={{ display: "flex", width: "100%" }}>
              <Space size={"large"}>
                <Form.Item
                  name="dob"
                  label="Date of Birth:"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your date of birth",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    picker="date"
                    placeholder="Chose date of birth"
                    defaultValue={defaultDate}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    { min: 9 },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    defaultValue={props.userData.phoneNumber}
                    value={"Admin"}
                  />
                </Form.Item>
              </Space>
            </div>

            <Form.Item label="Role:">
              <Input
                style={{ width: "100%" }}
                placeholder="role"
                defaultValue={props.userData.role.name}
                disabled
              />
            </Form.Item>
          </Form>
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <Divider />

          <Space>
            <Button
              block
              style={buttonStyle}
              form="myForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                navigate("/dashboard/myprofile");
              }}
              style={{
                width: 120,
              }}
            >
              Back
            </Button>
          </Space>
        </div>
      </Content>
    </>
  );
};
export default UpdateProfile;
