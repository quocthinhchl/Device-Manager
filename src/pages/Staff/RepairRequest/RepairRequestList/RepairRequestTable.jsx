import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Space, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';
import RepairRequestDetail from '../RepairRequestDetail/RepairRequestDetail';

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

const RepairRequestTable = props => {
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');
  const [rowIndex, setRowIndex] = useState(0);
  const userProfile = useSelector(UserProfile);

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord, props.status]);
  // console.log(22, props.idCategory);

  function renderData() {
    let APIUrl = `/repair-requests?&populate=user,device,staff&filters[staff][id][$eq]=${userProfile.user_profile.id}`;
    props.keyWord === ''
      ? (APIUrl += '')
      : (APIUrl += `&filters[user][id][$eq]=${props.keyWord}`);

    props.status !== 'all'
      ? (APIUrl += `&filters[status][$eq]=${props.status}`)
      : (APIUrl += '');

    axiosInstance
      .get(APIUrl)
      .then(res => {
        // console.log(22, res.data);
        const formattedData = res.data?.map((item, index) => ({
          ...item,
          rowIndex: rowIndex + index + 1,
        }));
        setData(formattedData);
        // setData(res.data);
      })
      .catch(error => {
        // console.error('Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  const handleOk = async (deviceId, status) => {
    const data = { data: { status: status } };

    await axiosInstance
      .put(`repair-requests/${currentChoice}`, data)
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

    if (status === 'Đã xong') {
      axiosInstance.put(`devices/${deviceId}`, {
        data: {
          status: 'Sẵn sàng',
        },
      });
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
      title: 'Vị trí',
      dataIndex: 'location',
      key: 'location',
      render: (_, location) => <td> {location.attributes.location}</td>,
      sorter: (a, b) =>
        a.attributes.location.localeCompare(b.attributes.location),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (_, description) => (
        <td> {description.attributes.description}</td>
      ),
      sorter: (a, b) =>
        a.attributes.description.localeCompare(b.attributes.description),
    },
    {
      title: 'Phân công',
      dataIndex: 'staff',
      key: 'staff',
      render: (_, staff) => (
        <td> {staff.attributes.staff.data?.attributes.username}</td>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, code) => <span>{code.attributes.status}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
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
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
      <RepairRequestDetail
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        idBorrow={currentChoice}
      />
    </TableData>
  );
};

export default RepairRequestTable;
