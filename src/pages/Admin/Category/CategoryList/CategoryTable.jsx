import React, { useEffect, useState } from 'react';
import { Modal, Table, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';

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

const CategoryTable = props => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord]);

  function renderData() {
    axiosInstance
      .get(
        `/categories?filters[${props.selectOption}][$contains]=${props.keyWord}&populate=devices`
      )
      .then(res => {
        console.log(22, res.data);
        const formattedData = res.data?.map((item, index) => ({
          ...item,
          total: item.attributes.devices.data?.length,
          rowIndex: index + 1,
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  const handleOk = async () => {
    await axiosInstance.delete(`/categories/${currentChoice.id}`).catch(e => {
      notification.error({
        message: 'Lỗi',
        description: `Lỗi.`,
      });
    });
    notification.success({
      message: 'Xóa thành công',
      description: `Xóa thành công`,
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
    navigate(`/admin/category_list/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/admin/category_list/edit/${id}`);
  }

  function handleDelete(category) {
    setCurrentChoice(category);
    setIsModalOpen(true);
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'rowIndex',
    },
    {
      title: 'Mã loại',
      dataIndex: 'code',
      key: 'code',
      render: (_, code) => <td> {code.attributes.code}</td>,
      sorter: (a, b) => a.attributes.code.localeCompare(b.attributes.code),
    },
    {
      title: 'Tên loại',
      dataIndex: 'name',
      key: 'name',
      render: (_, name) => <td> {name.attributes.name}</td>,
      sorter: (a, b) => a.attributes.name.localeCompare(b.attributes.name),
    },
    {
      title: 'Tổng số thiết bị',
      dataIndex: 'total',
      key: 'total',
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, categoryData) => (
        <span>
          <span>
            <a onClick={() => handleDetail(categoryData.id)}>
              <EyeOutlined />
            </a>
          </span>
          <span>
            <a onClick={() => handleEdit(categoryData.id)}>
              <EditOutlined />
            </a>
          </span>
          {/* <span> */}
          <a onClick={() => handleDelete(categoryData)}>
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
        dataSource={data}
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

export default CategoryTable;
