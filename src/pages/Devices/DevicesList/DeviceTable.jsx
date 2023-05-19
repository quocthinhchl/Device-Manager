import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../shared/constants';

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
    const [currentChoice, setCurrentChoice] = useState('');

    useEffect(() => {
        renderData()
    }, [props.selectOption, props.keyWord, props.status]);
    function renderData() {
        let APIUser = '/devices?populate=user.avatar';

        props.selectOption !== 'id' ? APIUser += `&filters[${props.selectOption}][$contains]=${props.keyWord}` : APIUser += `&filters[user][id][$eq]=${props.keyWord}`;
        props.status !== 'all' ? APIUser += `&filters[status][$eq]=${props.status}` : APIUser += ``;


        axiosInstance.get(`${APIUser} `).then(res => {
            setData(res.data);
        }, [useData, isModalOpen])
    }

    const handleOk = async () => {

        await axiosInstance.delete(`/devices/${currentChoice.id}`).catch(e => {
            notification.error({
                message: 'Lỗi',
                description: `Lỗi.`,
            });
        })
        notification.success({
            message: 'Xóa thành công',
            description: `Xóa thành công`,
        });
        setIsModalOpen(false);
        renderData()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function handleDetail(id) {
        navigate(`/dashboard/device_list/detail/${id}`)
    }

    function handleEdit(id) {
        navigate(`/dashboard/device_list/edit/${id}`)
    }

    function handleDelete(device) {
        setCurrentChoice(device)
        setIsModalOpen(true);
    }
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
                <span>
                    {(!user.attributes.user.data) ? <p></p> :
                        <td class="ant-table-cell" scope="col">
                            <Avatar src={API + user.attributes.user.data?.attributes.avatar.data?.attributes.url} /> {user.attributes.user.data?.attributes.fullname}
                        </td>}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, code) => (
                <span>
                    {(code.attributes.status === "active") ? <Tag color={'green'} key={'active'}> Active </Tag> : <Tag color={'volcano'} key={'active'}> Inactive </Tag>}
                </span>
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
                    {/* <span> */}
                    <a onClick={() => handleDelete(useData)} ><DeleteOutlined /></a>
                    {/* </span> */}
                </span>
            ),
        },
    ];

    return (
        <TableData>
            <Table align='center' columns={columns} dataSource={useData} style={{ width: '100%' }} pagination={{ pageSize: 5 }} />
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xoá {currentChoice?.attributes?.name} không?</p>
            </Modal>
        </TableData>
    );
};

export default DeviceTable;