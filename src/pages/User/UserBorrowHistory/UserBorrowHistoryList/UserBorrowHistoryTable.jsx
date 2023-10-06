import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Space, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../../shared/constants';
import UserAvatar from '../../../../assets/images/user-avatar.png';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';
import UserBorrowHistoryDetail from '../UserBorrowHistoryDetail/UserBorrowHistoryDetail';

const TableData = styled.div`
  width: 100%;
  .ant-table-thead {
    background-color: #dde4ee;
  }
  .ant-table-tbody .ant-table-cell:last-child a {
    margin: 0px 6px;
    font-size: 16px;
    color: #1d3557;
  }
  .ant-table-tbody .ant-table-cell:last-child a:hover {
    opacity: 50%;
  }
`;

const UserBorrowHistoryTable = props => {
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');
  const [rowIndex, setRowIndex] = useState(0);
  const userProfile = useSelector(UserProfile);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    renderData();
  }, [
    props.selectOption,
    props.keyWord,
    props.status,
    props.idCategory,
    page,
    pageSize,
  ]);
  // console.log(22, props.idCategory);

  function renderData() {
    let APIUrl = `/borrow-requests?filters[user][id][$eq]=${userProfile.user_profile.id}&populate=device&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    axiosInstance
      .get(APIUrl)
      .then(res => {
        const formattedData = res.data?.map((item, index) => ({
          ...item,
          rowIndex: rowIndex + index + 1,
        }));
        setTotal(res.meta?.pagination.total);
        setData(formattedData);
      })
      .catch(error => {
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const handleChangePage = value => {
    setPage(value);
  };

  const paginationConfig = {
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    onChange: page => {
      handleChangePage(page);
    },
    pageSize: pageSize,
    current: page,
    total: total,
  };

  function handleDetail(id) {
    setCurrentChoice(id);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentChoice('');
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'rowIndex',
      render: text => text,
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      render: (_, device) => (
        <td> {device.attributes.device.data.attributes.name}</td>
      ),
      sorter: (a, b) =>
        a.attributes.device.data.attributes.name.localeCompare(
          b.attributes.device.data.attributes.name
        ),
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'borrow_date',
      key: 'borrow_date',
      render: (_, request_date) => (
        <td> {request_date.attributes.borrow_date}</td>
      ),
      sorter: (a, b) =>
        a.attributes.borrow_date.localeCompare(b.attributes.borrow_date),
    },
    {
      title: 'Ngày trả',
      dataIndex: 'return_date',
      key: 'return_date',
      render: (_, return_date) => (
        <td> {return_date.attributes.return_date}</td>
      ),
      sorter: (a, b) =>
        a.attributes.return_date.localeCompare(b.attributes.return_date),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, code) => <span>{code.attributes.status}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'Hành động',
      key: 'Hành động',
      render: (text, useData) => (
        <span>
          <span>
            <a onClick={() => handleDetail(useData.id)}>
              <EyeOutlined />
            </a>
          </span>
        </span>
      ),
    },
  ];

  return (
    <TableData>
      <Table
        align="center"
        columns={columns}
        dataSource={useData}
        style={{ width: '100%' }}
        pagination={paginationConfig}
        rowKey="id"
      />
      <UserBorrowHistoryDetail
        open={isModalOpen}
        onCancel={handleCancel}
        idBorrow={currentChoice}
      />
    </TableData>
  );
};

export default UserBorrowHistoryTable;
