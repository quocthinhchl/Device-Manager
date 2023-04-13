import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
function handleEdit(id) {
    console.log(id);
}
const UserTable = () => {
    const TableData = styled.div`
    width:100%;
        .ant-table-thead{
            background-color:#DDE4EE;
        }
    `
    const [useData, setData] = useState([]);
    const [useDataDevices, setDataDevices] = useState([]);
    useEffect(() => {
        axiosInstance.get("/users?filters[fullname][$contains]=&filters[blocked][$eq]=false&populate=devices").then(res => {
            setData(res);
            setDataDevices(res.devices)
        })
    }, []);
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
            dataIndex: 'name',
            key: 'name',
            render: (text, useDataDevices) => (
                <span>
                    <p>
                        {useDataDevices.code}
                    </p>
                </span>)
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
    console.log(useDataDevices);
    return (
        <TableData>
            <Table align='center' columns={columns} dataSource={useData} style={{ width: '100%' }} />
        </TableData>
    );
};

export default UserTable;