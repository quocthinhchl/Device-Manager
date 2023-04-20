import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Table, Tag } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
import { useNavigate } from 'react-router';

const DeviceTable = (props) => {
    const TableData = styled.div`
    width:100%;
        .ant-table-thead{
            background-color:#DDE4EE;
        }
    `

    const [useData, setData] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        renderData()
    }, [props.selectOption, props.keyWord, props.blocked]);
    function renderData() {
        axiosInstance.get(`/devices?populate=user.avatarx`).then(res => {
            setData(res.data);
        }, [])
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        // await axiosInstance.delete(`users/${id}`)
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    function handleDetail(id) {
        navigate(`/dashboard/users_list/detail/${id}`)
    }

    function handleEdit(id) {
        navigate(`/dashboard/users_list/edit/${id}`)
    }

    function handleDelete(id) {
        showModal()
    }

    console.log(1111, props.selectOption, props.keyWord);
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (_, code) => (
                <p> {code.attributes.code}</p >
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, code) => (
                <p> {code.attributes.name}</p >
            )
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (text, user) => (
                <td class="ant-table-cell" scope="col">
                    <Avatar /> {user.attributes.user.data?.attributes.fullname}
                </td>
            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, code) => (
                <p> {code.attributes.status}</p >
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, useData) => (
                <span>
                    <span>
                        <a onClick={() => handleDetail(useData.id)}><EyeOutlined /></a>
                    </span>
                    <span>
                        <a onClick={() => handleEdit(useData.id)} ><EditOutlined /></a>
                    </span>
                    <span>
                        <a onClick={() => handleDelete(useData.id)} ><DeleteOutlined /></a>
                    </span>
                </span>
            ),
        },
    ];
    return (
        <TableData>
            <Table align='center' columns={columns} dataSource={useData} style={{ width: '100%' }} pagination={{ pageSize: 5 }} />
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xoá không?</p>
            </Modal>
        </TableData>
    );
};

export default DeviceTable;