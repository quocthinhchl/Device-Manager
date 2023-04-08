import React, { useState } from "react";
import { Button, Col, Input, Pagination, Row, Select, Space, Table, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";
import { SearchOutlined, ShrinkOutlined } from "@ant-design/icons";
import SelectOption from "./SelectOption";
import UserTable from "./UserTable";
const options = [];
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

const UserLayout = styled.div`
    display:flex;
    justify-content:'space-evenly';
    flex-direction:'column';
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .ant-table-cell a{
        margin:0px 3px;
    }
    .ant-space-compact .ant-select-compact-item .ant-select-selector{
        border-right:none;
        width:120px
    }
    .ant-space-compact .ant-input-compact-last-item{
        border-left:none;
    }
    .ant-space-compact .ant-select-compact-item .ant-select-arrow{
        padding-right:10px;
        border-right:1px solid #111
    }
    .ant-dropdown{
        margin-top: 4px;
    }
`
function UserManager() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <UserLayout>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}
                justify={'center'}
            >
                <Space direction='vertical' size={24}  >

                    <Row justify={"space-between"}>
                        <Col>
                            <h3>All User</h3>
                        </Col>
                        <Col>
                            <Button type="primary">Add User</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Space>
                            <Col>
                                <Space>
                                    {/* <Select defaultValue="Option1" >
                                        <Option value="Option1">Option1</Option>
                                        <Option value="Option2">Option2</Option>
                                    </Select> */}
                                    <Input prefix={<SelectOption />} suffix={<SearchOutlined />} />
                                </Space>
                            </Col>
                            <Col>
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        defaultValue="Status"
                                        onChange={handleChange}
                                        style={{
                                            width: 200,
                                        }}
                                        options={options}
                                    />
                                </Space>
                            </Col>
                        </Space>
                    </Row>
                    <Row>
                        <UserTable />
                    </Row>
                </Space>
            </Content>
        </UserLayout >
    )
}

export default UserManager