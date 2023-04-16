import React, { useEffect, useState } from 'react';
import { Avatar, Table } from 'antd';
import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
function handleEdit(id) {
    console.log(id);
}
const UserTable = (props) => {
    const TableData = styled.div`
    width:100%;
        .ant-table-thead{
            background-color:#DDE4EE;
        }
    `
    const [useData, setData] = useState([]);
    useEffect(() => {
        renderData()
    }, [props.selectOption, props.keyWord, props.blocked]);
    function renderData() {
        axiosInstance.get(`/users?populate=devices&filters[${props.selectOption}][$contains]=${props.keyWord}&filters[blocked][$contains]=${props.blocked}`).then(res => {
            setData(res);
        }, [])
    }
    console.log(1111, props.selectOption, props.keyWord);
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            render: (text, useDataDevices) => (
                <td class="ant-table-cell" scope="col">
                    <Avatar src={useDataDevices.avatar} /> {useDataDevices.fullname}
                </td>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, useDataDevices) => (
                <td class="ant-table-cell" scope="col">
                    {(useDataDevices.blocked == false) ? "Active" : "Inactive"}
                </td>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, useData) => (
                <span>
                    <span>
                        <a onClick={() => handleEdit(useData.id)}><EyeOutlined /></a>
                    </span>
                    <span>
                        <a onClick={() => handleEdit(useData)} ><EditOutlined /></a>
                    </span>
                    <span>
                        <a onClick={() => handleEdit(useData)} ><DeleteOutlined /></a>
                    </span>
                </span>
            ),
        },
    ];
    return (
        <TableData>
            <Table align='center' columns={columns} dataSource={useData} style={{ width: '100%' }} pagination={{ pageSize: 5 }} />
        </TableData>
    );
};

export default UserTable;