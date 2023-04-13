import React, { useState } from "react";
import { Button, Col, Input, Pagination, Row, Select, Space, Table, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import styled from "styled-components";
import { SearchOutlined, ShrinkOutlined } from "@ant-design/icons";
import SelectOption from "./SelectOption";
import UserTable from "./UserTable";
import { Option } from "antd/es/mentions";
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
        border:none !important 
    }
    .ant-space-compact .ant-select-compact-item .ant-select-selector{
        border:none !important 
    }
    .ant-space-compact .ant-select-compact-item .ant-select-arrow{
        padding-right:10px;
        border-right:1px solid #111;
    }
    .ant-dropdown{
        margin-top: 4px;
    }
    .ant-space-compact{
        border:1px solid #CBCBCB;
        border-radius: 5px;
;
    }
`
function UserManager() {
    const [option, setOption] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleDataChange = (newData) => {
        setOption(newData);
        console.log(11, option);
    };
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
                                <Space.Compact block>
                                    <Select
                                        defaultValue="Name"
                                        style={{
                                            width: 120,
                                        }}
                                        options={[
                                            {
                                                value: 'Email',
                                                label: 'Email',
                                            }, {
                                                value: 'Name',
                                                label: 'Name',
                                            },
                                        ]}
                                    />
                                    <Input suffix={<SearchOutlined />} />
                                </Space.Compact>
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