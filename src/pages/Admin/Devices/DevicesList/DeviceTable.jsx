import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Space, Table, Tag, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../../shared/constants';
import UserAvatar from '../../../../assets/images/user-avatar.png';

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

const DeviceTable = props => {
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');
  const [rowIndex, setRowIndex] = useState(0);

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord, props.status, props.idCategory]);
  // console.log(22, props.idCategory);

  function renderData() {
    let APIUrl = '/devices?populate=category,image,user.avatar';

    props.selectOption !== 'id'
      ? (APIUrl += `&filters[${props.selectOption}][$contains]=${props.keyWord}`)
      : (APIUrl += `&filters[user][id][$eq]=${props.keyWord}`);
    props.status !== 'all'
      ? (APIUrl += `&filters[status][$eq]=${props.status}`)
      : (APIUrl += '');
    if (props.idCategory === []) {
      APIUrl += '';
    } else {
      props.idCategory.map(category => {
        return (APIUrl += `&filters[category][id][$in]=${category}`);
      });
    }

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

  const handleOk = async () => {
    await axiosInstance
      .delete(`/devices/${currentChoice.id}`)
      .then(() => {
        notification.success({
          message: 'Xóa thành công',
          description: `Xóa thành công`,
        });
      })
      .catch(e => {
        notification.error({
          message: e.error.message,
          description: `Có lỗi xảy ra vui lòng thử lại`,
        });
      });

    setIsModalOpen(false);
    setCurrentChoice('');
    renderData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentChoice('');
  };

  function handleDetail(id) {
    navigate(`/admin/device_list/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/admin/device_list/edit/${id}`);
  }

  function handleDelete(device) {
    setCurrentChoice(device);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'rowIndex',
      render: text => text,
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'code',
      key: 'code',
      render: (_, device) => <td> {device.attributes.code}</td>,
      sorter: (a, b) => a.attributes.code.localeCompare(b.attributes.code),
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
      render: (_, device) => <td> {device.attributes.name}</td>,
      sorter: (a, b) => a.attributes.name.localeCompare(b.attributes.name),
    },
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (text, user) => (
        <span>
          {!user.attributes.user.data ? (
            <p></p>
          ) : (
            <td class="ant-table-cell" scope="col">
              {user.attributes.user.data?.attributes.avatar.data ? (
                <Avatar
                  src={
                    API +
                    user.attributes.user.data?.attributes.avatar.data
                      ?.attributes.url
                  }
                />
              ) : (
                <Avatar src={UserAvatar} />
              )}{' '}
              {user.attributes.user.data?.attributes.fullname}
            </td>
          )}
        </span>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
      render: (_, device) => (
        <td> {device.attributes.category.data?.attributes.name}</td>
      ),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (_, code) => (
        <span>
          {/* {(code.attributes.status === 'Inactive') |
          (code.attributes.status === 'Faulty') ? (
            <Tag color={'volcano'} key={code.attributes.status}>
              {code.attributes.status}
            </Tag>
          ) : (
            <Tag color={'green'} key={'code.attributes.status'}>
              {code.attributes.status}
            </Tag>
          )} */}
          {code.attributes.status}
        </span>
      ),
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
          <span>
            <a onClick={() => handleEdit(useData.id)}>
              <EditOutlined />
            </a>
          </span>
          {/* <span> */}
          <a onClick={() => handleDelete(useData)}>
            <DeleteOutlined />
          </a>
          {/* </span> */}
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
      <Modal
        title="Detele"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có chắc chắn muốn xoá {currentChoice?.attributes?.name} không?
        </p>
      </Modal>
    </TableData>
  );
};

export default DeviceTable;
