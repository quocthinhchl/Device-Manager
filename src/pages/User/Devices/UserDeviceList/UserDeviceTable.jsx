import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Modal,
  Form,
  DatePicker,
  Table,
  Input,
  Tag,
  notification,
} from 'antd';
// import { useDebounce } from 'use-debounce';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../../shared/constants';
import UserAvatar from '../../../../assets/images/user-avatar.png';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { UserProfile } from '../../../../stores/Slice/UserSlice';

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

const UserDeviceTable = props => {
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [deviceDetail, setDeviceDetail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [currentChoice, setCurrentChoice] = useState('');
  const userProfile = useSelector(UserProfile);
  const [rowIndex, setRowIndex] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord, props.status, props.idCategory]);

  useEffect(() => {
    axiosInstance
      .get(`/devices/${currentChoice}?populate=category`)
      .then(res => {
        setDeviceDetail(res.data);
      })
      .catch(error => {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }, [currentChoice]);

  useEffect(() => {
    if (deviceDetail) {
      form.setFieldsValue({
        code: deviceDetail.attributes?.code,
        name: deviceDetail.attributes?.name,
      });
    }
  }, [deviceDetail, form]);

  function renderData() {
    let APIUrl = `/devices?populate=category,image&filters[${props.selectOption}][$contains]=${props.keyWord}&filters[status][$eq]=Sẵn sàng`;

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
        const formattedData = res.data?.map((item, index) => ({
          ...item,
          rowIndex: rowIndex + index + 1,
        }));
        setData(formattedData);
      })
      .catch(error => {
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  function handleDetail(id) {
    navigate(`/user/device_list/detail/${id}`);
  }

  function handleBorrow(id) {
    setCurrentChoice(id);
    showModal();
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeBorrowDate = (date, dateString) => {
    setBorrowDate(dateString);
  };

  const onChangeReturnDate = (date, dateString) => {
    setReturnDate(dateString);
  };

  const handleBorrowRequest = async () => {
    try {
      await form.validateFields();
      const data = {
        data: {
          user: userProfile.user_profile.id,
          device: currentChoice,
          location: location,
          borrow_date: borrowDate,
          return_date: returnDate,
          status: 'Chờ',
        },
      };

      // console.log(data);
      axiosInstance
        .post(`/borrow-requests`, data)
        .then(res => {
          axiosInstance.put(`devices/${currentChoice}`, {
            data: {
              status: 'Đang mượn',
            },
          });
          notification.success({
            message: 'Gửi yêu cầu mượn thành công',
          });
          renderData();
          // navigate('/user/device_list');
        })
        .catch(error => {
          notification.error({
            message: error.message,
            description: 'Có lỗi xảy ra, vui lòng thử lại',
          });
        });

      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

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
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, device) => (
        <td>
          <Avatar
            shape="square"
            size={64}
            src={API + device.attributes?.image?.data?.attributes.url}
          />
        </td>
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
          <Button onClick={() => handleDetail(useData.id)}>Xem</Button>
          <Button type="primary" onClick={() => handleBorrow(useData.id)}>
            Mượn
          </Button>
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
        title={`Bạn có muốn mượn ${deviceDetail?.attributes?.name} không?`}
        visible={isModalVisible}
        onOk={handleBorrowRequest}
        onCancel={handleCancel}
        okText="Mượn"
        cancelText="Huỷ"
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="Mã thiết bị" name="code">
            <Input name="code" disabled />
          </Form.Item>
          <Form.Item label="Tên thiết bị" name="name">
            <Input name="name" disabled />
          </Form.Item>
          <Form.Item
            label="Vị trí"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
          >
            <Input
              placeholder="Please input location"
              onChange={e => setLocation(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Ngày mượn"
            name="borrow_date"
            rules={[
              { required: true, message: 'Vui lòng nhập ngày mượn!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isAfter(moment(), 'day')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Ngày mượn phải ở tương lai')
                  );
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              picker="date"
              placeholder="YY-MM-DD"
              onChange={onChangeBorrowDate}
            />
          </Form.Item>
          <Form.Item
            label="Ngày trả"
            name="return_date"
            rules={[
              { required: true, message: 'Vui lòng nhập ngày trả!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isAfter(moment(), 'day')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Ngày trả phải ở tương lai'));
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              picker="date"
              placeholder="YY-MM-DD"
              onChange={onChangeReturnDate}
            />
          </Form.Item>
        </Form>
      </Modal>
    </TableData>
  );
};

export default UserDeviceTable;
