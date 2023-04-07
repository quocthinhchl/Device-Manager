import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
const data = [
    {
        stt: '1',
        key: '1',
        name: 'John Brown',
        email: 'abc@gmail.com',
        phonenum: '999',
        status: 'Active',
        actions: [
            <a><EyeOutlined /></a>,
            <a><EditOutlined /></a>,
            <a><DeleteOutlined /></a>
        ]
    },
    {
        stt: '1',
        key: '1',
        name: 'John Brown',
        email: 'abc@gmail.com',
        phonenum: '999',
        status: 'Active',
        actions: [
            <a><EyeOutlined /></a>,
            <a><EditOutlined /></a>,
            <a><DeleteOutlined /></a>
        ]
    },
    {
        stt: '1',
        key: '1',
        name: 'John Brown',
        email: 'abc@gmail.com',
        phonenum: '999',
        status: 'Active',
        actions: [
            <a><EyeOutlined /></a>,
            <a><EditOutlined /></a>,
            <a><DeleteOutlined /></a>
        ]
    },
    {
        stt: '1',
        key: '1',
        name: 'John Brown',
        email: 'abc@gmail.com',
        phonenum: '999',
        status: 'Active',
        actions: [
            <a><EyeOutlined /></a>,
            <a><EditOutlined /></a>,
            <a><DeleteOutlined /></a>
        ]
    },
];

const UserTable = () => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phonenum',
            key: 'phonenum',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];
    const TableData = styled.div`
    width:100%;
        .ant-table-thead{
            background-color:#DDE4EE
        }

    `
    const { current, pageSize } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = data.slice(startIndex, endIndex);

    return (
        <TableData>
            <Table align='center' dataSource={displayedData} columns={columns} style={{ width: '100%' }} />
        </TableData>
    );
};

export default UserTable;