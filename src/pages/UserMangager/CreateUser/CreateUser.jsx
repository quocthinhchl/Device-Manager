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
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
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
  const deleteicon = DeleteOutlined;

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
              <p>${dv} </p>

          `;
    });
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
    margin: 10px 15px;
    padding: 18px;
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
                      <Input
                        size="default size"
                        placeholder="Enter ower Name"
                      />
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
                        size="default size"
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
                      <Input
                        size="default size"
                        placeholder="Enter ower username"
                      />
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
                      <Input
                        size="default size"
                        placeholder="Enter ower Password"
                      />
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
                      <Input
                        size="default size"
                        placeholder="Enter ower email"
                      />
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
                        size="default size"
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
                        size="default size"
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
                        size="default size"
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
                        size="default size"
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
                    <FormItem label="Devices" name="Devices" rules={[{}]}>
                      <Row style={{ border: "1px solid #dcd2d2" }}>
                        <Col
                          span={12}
                          style={{
                            padding: "10px 10px 10px 10px",
                          }}
                        >
                          <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="default size"
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
                            <Row style={{ paddingTop: 10 }}>
                              <Col span={12}>
                                <Checkbox value="Garage ABC">
                                  Garage ABC
                                </Checkbox>
                              </Col>
                              <Col span={24}>
                                <Checkbox value="TLS">TLS</Checkbox>
                              </Col>
                              <Col span={24}>
                                <Checkbox value="AHC">AHC</Checkbox>
                              </Col>
                              <Col span={24}>
                                <Checkbox value="CB Garage">CB Garage</Checkbox>
                              </Col>
                              <Col span={24}>
                                <Checkbox value="UCQ">UCQ</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Col>

                        <Col
                          span={12}
                          style={{
                            borderLeft: "1px solid #dcd2d2",
                            padding: 10,
                          }}
                        >
                          <p style={{ fontWeight: "bold" }}>
                            Seclect Devices ({checkV.length})
                          </p>
                          <div>
                            <div
                              style={{ fontSize: 12 }}
                              dangerouslySetInnerHTML={render()}
                            ></div>
                          </div>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Row style={{ borderTop: "1px solid #dcd2d2" }}>
            <Space style={{ paddingTop: 10 }}>
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
