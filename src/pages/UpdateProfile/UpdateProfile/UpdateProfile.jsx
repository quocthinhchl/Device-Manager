/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import {
  Layout,
  Select,
  theme,
  Checkbox,
  Col,
  Avatar,
  Row,
  Button,
  Space,
  Input,
  Form,
  InputNumber,
  DatePicker,
  Modal,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



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
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng;
};

const UpdateProfile = () => {
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
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
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

  return (
    <>
      <h5 style={{ margin: "10px 25px 0px 20px" }}>Update Profile</h5>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,

          background: colorBgContainer,
          display: "flex",
          flexDirection: "collumn",
          maxHeight: 600,
        }}
      >
        <div
          style={{
            width: "30%",
            paddingLeft: 20,
            height: 800,
          }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
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
              name="fullName"
              label="Full Name:"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                { whitespace: true },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your name" />
            </Form.Item>
            <Form.Item name="fullName" label="Username:">
              <Input placeholder="Username" disabled />
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
              hasFeedback
            >
              <Input
                placeholder="Type your email"
                value={"hung@gmail.com"}
              ></Input>
            </Form.Item>
            <div style={{ display: "flex" }}>
              <Form.Item
                name="dob"
                label="Date of Birth:"
                rules={[
                  {
                    required: true,
                    message: "Please provide your date of birth",
                  },
                ]}
                hasFeedback
              >
                <DatePicker
                  style={{ width: "100%" }}
                  picker="date"
                  placeholder="Chose date of birth"
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
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <Form.Item label="Address:">
              <Input.Group compact>
                {/* <Form.Item
                  name={["address", "province"]}
                  noStyle
                  rules={[{ required: true, message: "Province is required" }]}
                >
                  <Select placeholder="Select province">
                    <Option value="HN">Hà Nội</Option>
                    <Option value="HCm">Hồ Chí Minh</Option>
                  </Select>
                </Form.Item> */}
                <Form.Item
                // name={["address", "street"]}
                // noStyle
                // rules={[{ required: true, message: "Street is required" }]}
                >
                  <Input style={{ width: "100%" }} placeholder="Input street" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item label="Role:">
              <Input
                style={{ width: "100%" }}
                placeholder="role"
                value={"Admin"}
                disabled
              />
            </Form.Item>
            {/* <Form.Item
              name="agreement"
              wrapperCol={{ span: 24 }}
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "To proceed, you need to agree with our terms and conditions"
                        ),
                },
              ]}
            >
              <Checkbox>
                {" "}
                Agree to our <a href="#">Terms and Conditions</a>
              </Checkbox>
            </Form.Item> */}

            <Form.Item wrapperCol={{ span: 24 }}>
              <Space>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    navigate("/users");
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
export default UpdateProfile;
