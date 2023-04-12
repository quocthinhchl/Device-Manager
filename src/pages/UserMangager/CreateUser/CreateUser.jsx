import React, { useEffect, useState } from "react";
import {
  theme,
  Descriptions,
  Col,
  Avatar,
  Row,
  Button,
  Space,
  Divider,
  Input,
  Form,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../shared/services/http-client";
import FormItem from "antd/es/form/FormItem";
import Search from "antd/es/transfer/search";

const onSearch = (value) => console.log(value);
const CreateUser = () => {
  // const [useUser, setUser] = useState('')
  // useEffect(() => {
  //     axiosInstance.get("/users/me?populate=role,avatar,address").then(res => {
  //         setUser(res);
  //     })
  // }, []);

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const [checkV, setCheckV] = useState([]);
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);

    // setCheckV([])
    setCheckV(checkedValues);
    // var n = checkV.length
    // checkV.splice(0, n)
    // checkV.push(checkedValues)
    console.log(checkV);
    // render();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };



  function render() {
    const devices = checkV.map((dv) => {
      // return dv.map((d) => {
      return `
              <p>${dv} asdkasdasoid</p>

          `;
    })
    // return dv

    console.log(devices);
    return {
      __html: devices.join(""),
    };
  }

  const buttonStyle = {
    backgroundColor: "#8767E1",
    color: "#fff",
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
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  `;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <>
      <PathName>Add New User</PathName>
      <Content>
        <Col>
          <Row>
            <Col
              span={24}
              style={{
                flexGrow: 1,
              }}
            >
              <Form
                id="myForm"
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Row>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="Name"
                      name="Name"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower Name!",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter ower Name" />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Email"
                      name="Email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please input ower Email!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter ower email"
                        id="email"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="UserName"
                      name="Username"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower UserName!",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter ower username" />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="Password"
                      name="Password"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower Password!",
                        },
                        {
                          pattern: new RegExp(
                            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                          ),
                          message:
                            " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter ower Password" />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Phone number"
                      name="PhoneNunber"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower PhoneNumber!",
                        },
                        { min: 9 },
                      ]}
                    >
                      <Input size="large" placeholder="Enter ower email" />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="Gender"
                      name="Gender"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower Gender!",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select ower Gender"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: "Male",
                          },
                          {
                            value: "2",
                            label: "Female",
                          },
                          {
                            value: "3",
                            label: "Other",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="DOB"
                      name="DOB"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower DOB!",
                        },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        picker="date"
                        placeholder="Chose date of birth"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Role"
                      name="Role"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower Role!",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select ower Role"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: "Admin",
                          },
                          {
                            value: "2",
                            label: "User",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="Status"
                      name="Status"
                      rules={[
                        {
                          required: true,

                          message: "Please input ower Status!",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select ower Status"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: "Active",
                          },
                          {
                            value: "2",
                            label: "Inactive",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>

                  <Col span={24}>
                    {" "}
                    <FormItem label="Devices" name="Devices" rules={[{}]}>
                      <Row style={{}}>
                        <Col span={12} style={{ paddingRight: 16 }}>
                          <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                          />
                          <Checkbox.Group
                            style={{
                              width: "100%",
                            }}
                            onChange={onChange}
                            // options={options}
                            value={checkV}
                          >
                            <Row>
                              <Col span={8}>
                                <Checkbox value="A">A</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="B">B</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="C">C</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="D">D</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="E">E</Checkbox>
                              </Col>
                            </Row>

                          </Checkbox.Group>
                        </Col>

                        <Col span={12}>
                          <div dangerouslySetInnerHTML={render()}></div>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Divider />
          <Row>
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
                  navigate("");
                }}
              >
                Back
              </Button>
            </Space>
          </Row>
        </Col>
      </Content>
    </>
  );
};
export default CreateUser;
