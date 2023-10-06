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
import BorrowRequestDetail from '../BorrowRequestDetail/BorrowRequestDetail';

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

const BorrowRequestTable = props => {
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
  }, [props.selectOption, props.keyWord, props.status, page, pageSize]);

  function renderData() {
    let APIUrl = `/borrow-requests?&populate=user,device&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    props.keyWord === ''
      ? (APIUrl += '')
      : (APIUrl += `&filters[user][id][$eq]=${props.keyWord}`);

    props.status !== 'all'
      ? (APIUrl += `&filters[status][$eq]=${props.status}`)
      : (APIUrl += '');

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

  const handleOk = async (userId, deviceId, status) => {
    const data = { data: { status: status } };

    axiosInstance
      .put(`borrow-requests/${currentChoice}`, data)
      .then(() => {
        notification.success({
          message: 'Cập nhật thành công',
        });
      })
      .catch(e => {
        notification.error({
          message: e.error.message,
          description: `Có lỗi xảy ra vui lòng thử lại`,
        });
      });

    switch (status) {
      case 'Đang mượn':
        await axiosInstance
          .get(`users/${userId}?populate=devices`)
          .then(res => {
            const newDevices = res.devices?.map(device => {
              return device.id;
            });
            newDevices.push(deviceId);
            axiosInstance.put(`users/${userId}`, {
              devices: newDevices,
            });
          });
        axiosInstance.put(`devices/${deviceId}`, {
          data: {
            status: 'Đang mượn',
          },
        });
        break;
      case 'Từ chối':
        axiosInstance.put(`devices/${deviceId}`, {
          data: {
            status: 'Sẵn sàng',
          },
        });
        break;

      case 'Không lấy':
        axiosInstance.put(`devices/${deviceId}`, {
          data: {
            status: 'Sẵn sàng',
          },
        });
        break;

      case 'Đã trả':
        await axiosInstance
          .get(`users/${userId}?populate=devices`)
          .then(res => {
            const oldDevices = res.devices?.map(device => {
              return device.id;
            });
            const newDevices = oldDevices.filter(device => device !== deviceId);
            axiosInstance.put(`users/${userId}`, {
              devices: newDevices,
            });
          });
        axiosInstance.put(`devices/${deviceId}`, {
          data: {
            status: 'Sẵn sàng',
          },
        });
        break;
      case 'Mất':
        await axiosInstance
          .get(`users/${userId}?populate=devices`)
          .then(res => {
            const oldDevices = res.devices?.map(device => {
              return device.id;
            });
            const newDevices = oldDevices.filter(device => device !== deviceId);
            axiosInstance.put(`users/${userId}`, {
              devices: newDevices,
            });
          });
        axiosInstance.put(
          `devices/${useData.data.attributes.device.data?.id}`,
          {
            data: {
              status: 'Mất',
            },
          }
        );
        break;
      default:
        console.log('default');
        break;
    }

    setIsModalOpen(false);
    setCurrentChoice('');
    renderData();
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
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (_, user) => (
        <td> {user.attributes.user.data?.attributes.username}</td>
      ),
      sorter: (a, b) =>
        a.attributes.user.data?.attributes.username.localeCompare(
          b.attributes.user.data?.attributes.username
        ),
    },
    {
      title: 'Thiết bị',
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
      render: (_, borrow_date) => (
        <td> {borrow_date.attributes.borrow_date}</td>
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
      <BorrowRequestDetail
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        idBorrow={currentChoice}
      />
    </TableData>
  );
};

export default BorrowRequestTable;
