import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Space, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import axiosInstance from '../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfile, fetchUserData, getUserList, setUserList } from '../../../stores/Slice/UserSlice';

const UserTable = (props) => {
    const TableData = styled.div`
    width:100%;
    /* max-height: 450px; Đặt chiều cao tối đa cho container */
        .ant-table-thead{
            background-color:#DDE4EE;
        }
        .ant-table-tbody .ant-table-cell:last-child a{
            margin: 0px 5px;
            font-size: 16px;
            color:#1D3557
        }
        .ant-table-tbody .ant-table-cell:last-child a:hover{
            opacity:50%
        }
    `
    const [useData, setData] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChoice, setCurrentChoice] = useState('');
    const userProfile = useSelector(UserProfile)

    useEffect(() => {
        renderData()
        // dispatch(getUserList(useData))
        // dispatch(fetchUserData());
    }, [props.selectOption, props.keyWord, props.blocked]);


    function renderData() {
        // axiosInstance.get(`/users?populate=devices,avatar&filters[${props.selectOption}][$contains]=${props.keyWord}&filters[blocked][$contains]=${props.blocked}`).then(res => {
        //     setData(res);
        // }, [])
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(
                    `/users?populate=devices,avatar&filters[${props.selectOption}][$contains]=${props.keyWord}&filters[blocked][$contains]=${props.blocked}`
                );
                if (res.data) {
                    setData(res);

                }
            } catch (error) {
                notification.warning({
                    message: 'Có gì đó không ổn',
                    description: `Có gì đó không ổn`,
                });
            }
        };
        fetchData();
    }


    const handleOk = async () => {
        setIsModalOpen(false);
        await axiosInstance.delete(`/users/${currentChoice}`).catch(e => {
            notification.error({
                message: 'Lỗi',
                description: `Lỗi.`,
            });
        })
        notification.success({
            message: 'Xóa thành công',
            description: `Xóa thành công`,
        });
        renderData()
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
        setCurrentChoice(id)
        setIsModalOpen(true);
    }

    // console.log(1111, props.selectOption, props.keyWord);
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
                    <Avatar src={API + useDataDevices.avatar?.url} /> {useDataDevices.fullname}
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
                <span>
                    {(useDataDevices.blocked == false) ? <Tag color={'green'} key={'active'}> Active </Tag> : <Tag color={'volcano'} key={'active'}> Inactive </Tag>}
                </span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, useData) => (
                <Space>

                    <span>
                        <span>
                            <a onClick={() => handleDetail(useData.id)}><EyeOutlined /></a>
                        </span>
                        {(userProfile.isAdmin) ? <span> <a onClick={() => handleEdit(useData.id)} ><EditOutlined /></a>  <a onClick={() => handleDelete(useData.id)} ><DeleteOutlined /></a> </span> : ''}
                    </span>
                </Space>
            ),
        },
    ];
    return (
        <TableData>
            <Table align='center' columns={columns} dataSource={useData} style={{ width: '100%' }} pagination={{ pageSize: 10 }} />
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xoá {currentChoice?.attributes?.name} không?</p>
            </Modal>
        </TableData>
    );
};

export default UserTable;