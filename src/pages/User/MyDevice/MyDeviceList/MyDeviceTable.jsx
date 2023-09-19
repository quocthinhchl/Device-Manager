import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  notification,
} from 'antd';
// import { useDebounce } from 'use-debounce';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '../../../../shared/services/http-client';
import { useNavigate } from 'react-router';
import { API } from '../../../../shared/constants';
import UserAvatar from '../../../../assets/images/user-avatar.png';
import { useSelector } from 'react-redux';
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

const MyDeviceTable = props => {
  const [deviceDetail, setDeviceDetail] = useState('');
  const [useData, setData] = useState([]);
  const navigate = useNavigate();
  const [rowIndex, setRowIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChoice, setCurrentChoice] = useState('');
  const [repairData, setRepairData] = useState({
    location: '',
    description: '',
  });
  const userProfile = useSelector(UserProfile);
  const [form] = Form.useForm();

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

  useEffect(() => {
    renderData();
  }, [props.selectOption, props.keyWord, props.status, props.idCategory]);
  // console.log(22, props.idCategory);

  function renderData() {
    let APIUrl = `/devices?populate=category,image&filters[${props.selectOption}][$contains]=${props.keyWord}&filters[user][id][$eq]=${userProfile.user_profile.id}`;

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
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      });
  }

  function handleDetail(id) {
    navigate(`/user/my_device/detail/${id}`);
  }

  const handleRepair = id => {
    setCurrentChoice(id);
    showModal();
  };

  const onChangeRepairData = (name, value) => {
    setRepairData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRepairRequest = async () => {
    try {
      await form.validateFields();
      const data = {
        data: {
          user: userProfile.user_profile.id,
          device: currentChoice,
          location: repairData.location,
          description: repairData.description,
          status: 'Chờ',
        },
      };

      // console.log(data);
      axiosInstance
        .post(`/repair-requests`, data)
        .then(res => {
          axiosInstance.put(`devices/${currentChoice}`, {
            data: {
              status: 'Hỏng',
            },
          });
          notification.success({
            message: 'Gửi yêu cầu sửa chữa thành công',
          });
          navigate('/user/my_device');
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, useData) => (
        <span>
          <Button onClick={() => handleDetail(useData.id)}>Xem</Button>
          <Button type="primary" onClick={() => handleRepair(useData.id)}>
            Báo lỗi
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <TableData>
        <Table
          align="center"
          columns={columns}
          dataSource={useData}
          style={{ width: '100%' }}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </TableData>
      <Modal
        title="Thông báo sửa chữa"
        open={isModalVisible}
        onOk={handleRepairRequest}
        onCancel={handleCancel}
        okText="Report"
        cancelText="Cancel"
      >
        <Form
          form={form}
          name="basic"
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
            rules={[
              {
                required: true,
                message: 'Vui long nhập vị trí của thiết bị',
              },
            ]}
          >
            <Input
              placeholder="Nhập vị trí của thiết bị"
              onChange={e => onChangeRepairData('location', e.target.value)}
              value={repairData.location}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả tình trạng thiết bị',
              },
            ]}
          >
            <Input
              placeholder="Nhập mô tả tình trạng thiết bị"
              onChange={e => onChangeRepairData('description', e.target.value)}
              value={repairData.description}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyDeviceTable;
