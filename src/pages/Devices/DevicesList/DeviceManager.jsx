import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Space, Table, notification, theme } from "antd";
// import { useDebounce } from 'use-debounce';
import styled from "styled-components";
import { SearchOutlined, ShrinkOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import DeviceTable from "./DeviceTable";
import { useDebounce } from "use-debounce";
import debounce from "lodash.debounce";
const options = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'Inactive',
    },
    {
        value: 'all',
        label: 'All',
    },
];
const UserLayout = styled.div`
    display:flex;
    justify-content:'space-evenly';
    flex-direction:'column';
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    .ant-table-cell a{
        margin:0px 3px;
    }
    .ant-space-compact .ant-select-compact-item .ant-select-selector{
        border-right:none;
        width:120px;
    }
    .ant-space-compact .ant-input-compact-last-item{
        border:none !important; 
    }
    .ant-space-compact .ant-select-compact-item .ant-select-selector{
        border:none !important; 
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
    }
`
const buttonStyle = {
    backgroundColor: '#8767E1',
    color: '#fff',
};
const Content = styled.div`
    margin: 26px 20px;
    padding: 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius:5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width:100%;
`;
function DeviceManager() {
    const [selectedValue, setSelectedValue] = useState('code');
    const [keyWord, setKeyWord] = useState('');
    const [status, setStatus] = useState('all');
    const navigate = useNavigate();

    // const [debouncedSearchTerm] = useDebounce(keyWord, 500);

    // const filteredData = data.filter(item =>
    //     item[searchType].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    // );
    function handleSelect(value) {
        setSelectedValue(value);
        console.log(6666, selectedValue);
    }
    function handleSelectBlocked(value) {
        setStatus(value);
    }
    const DebounceSearch = useCallback(debounce((nextValue) => setKeyWord(nextValue), 700), []);
    const handleSearchValueChange = (event) => {
        DebounceSearch(event.target.value)

    };

    let location = useLocation();
    return (
        <UserLayout>
            <Content>
                <Space direction='vertical' size={24}  >
                    <Row justify={"space-between"}>
                        <Col>
                            <h3>All Device</h3>
                        </Col>
                        <Col>
                            <Button style={buttonStyle} onClick={() => { navigate('/dashboard/device_list/create') }}> Add Device</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Space>
                            <Col>
                                <Space.Compact block>
                                    <Select
                                        defaultValue="Code"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleSelect}
                                        options={[
                                            {
                                                value: 'code',
                                                label: 'Code',
                                            }, {
                                                value: 'name',
                                                label: 'Name',
                                            },
                                            {
                                                value: 'id',
                                                label: 'User ID',
                                            },
                                        ]}
                                    />
                                    <Input suffix={<SearchOutlined />} onChange={handleSearchValueChange} enterButton />
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
                                        defaultValue="All"
                                        onChange={handleSelectBlocked}
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
                        <DeviceTable selectOption={selectedValue} keyWord={keyWord} status={status} />
                    </Row>
                </Space>
            </Content>
        </UserLayout >
    )
}

export default DeviceManager