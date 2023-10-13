import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Space, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';
import UserAvatar from '../../../../assets/images/user-avatar.png';

const TableData = styled.div`
  width: 100%;
  /* max-height: 450px; Đặt chiều cao tối đa cho container */
  .ant-table-thead {
    background-color: #dde4ee;
  }
  .ant-table-tbody .ant-table-cell:last-child a {
    margin: 0px 5px;
    font-size: 16px;
    color: #1d3557;
  }
  .ant-table-tbody .ant-table-cell:last-child a:hover {
    opacity: 50%;
  }
`;
const UserTable = props => {
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');
  const userProfile = useSelector(UserProfile);
  const [rowIndex, setRowIndex] = useState(0);

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord, props.blocked]);

  function renderData() {
    let APIUrl = `/users?populate=devices,avatar`;

    props.blocked !== ''
      ? (APIUrl += `&filters[blocked][$eq]=${props.blocked}`)
      : (APIUrl += '');

    props.keyWord !== ''
      ? (APIUrl += `&filters[${props.selectOption}][$contains]=${props.keyWord}`)
      : (APIUrl += '');
    axiosInstance
      .get(APIUrl)
      .then(res => {
        const formattedData = res.map((item, index) => ({
          ...item,
          rowIndex: rowIndex + index + 1,
        }));
        setData(formattedData);
      }, [])
      .catch(error => {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  const handleDeleteOk = async () => {
    setIsModalOpen(false);
    await axiosInstance.delete(`/users/${currentChoice}`).catch(e => {
      notification.error({
        message: e.message,
      });
    });
    notification.success({
      message: 'Xóa thành công',
    });
    setCurrentChoice('');
    renderData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentChoice('');
  };

  function handleDetail(id) {
    navigate(`/admin/users_list/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/admin/users_list/edit/${id}`);
  }

  function handleDelete(id) {
    setCurrentChoice(id);
    setIsModalOpen(true);
  }

  // console.log(1111, props.selectOption, props.keyWord);
  const columns = [
    {
      title: '#',
      dataIndex: 'rowIndex',
      render: text => text,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      render: (text, useDataDevices) => (
        <td class="ant-table-cell" scope="col">
          {useDataDevices.avatar ? (
            <Avatar src={API + useDataDevices.avatar?.url} />
          ) : (
            <Avatar src={UserAvatar} />
          )}{' '}
          {useDataDevices.fullname}
        </td>
      ),
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, useDataDevices) => (
        <span>
          {useDataDevices.blocked === false ? (
            <Tag color={'green'} key={'active'}>
              {' '}
              Active{' '}
            </Tag>
          ) : (
            <Tag color={'volcano'} key={'active'}>
              {' '}
              Inactive{' '}
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'Hành động',
      key: 'Hành động',
      render: (text, useData) => (
        <Space>
          <span>
            <span>
              <a onClick={() => handleDetail(useData.id)}>
                <EyeOutlined />
              </a>
            </span>
            {userProfile.isAdmin ? (
              <span>
                {' '}
                <a onClick={() => handleEdit(useData.id)}>
                  <EditOutlined />
                </a>{' '}
                <a onClick={() => handleDelete(useData.id)}>
                  <DeleteOutlined />
                </a>{' '}
              </span>
            ) : (
              ''
            )}
          </span>
        </Space>
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
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Detele"
        open={isModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có chắc chắn muốn xoá {currentChoice?.attributes?.name} không?
        </p>
      </Modal>
    </TableData>
  );
};

export default UserTable;
