import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  theme,
  Col,
  Row,
  Button,
  Space,
  Input,
  Form,
  Select,
  DatePicker,
  List,
  Typography,
  Checkbox,
  Table,
  message,
  notification,
  Breadcrumb,
} from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../../shared/services/http-client';
import FormItem from 'antd/es/form/FormItem';
import Search from 'antd/es/transfer/search';
import icon from '../../../../assets/images/Delete.png';
import Item from 'antd/es/list/Item';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';

const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};

const PathName = styled.p`
  margin: 10px 25px 0px 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #111111;
`;

const Content = styled.div`
  margin: 10px 15px;
  padding: 18px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const UpdateUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [checkedList, setCheckedList] = useState([]);
  const [deviceNames, setDeviceNames] = useState([]);
  const [search, setSearch] = useState('');
  const [DVS, setDVS] = useState([]);
  const userProfile = useSelector(UserProfile);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(
          `users/${id}?populate=devices,role`
        );
        setUser(res);
        setDVS(res.devices);
      } catch (error) {
        console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui lòng thử lại',
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dob: dayjs(user.dob, 'YYYY-MM-DD'),
        role: user.role?.id,
        position: user.position,
        status: user.blocked === false ? false : true,
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchDevice = async () => {
      await axiosInstance
        .get(
          `/devices?filters[name][$contains]=${search}&filters[user][id][$eq]=${id}`
        )
        .then(res => {
          setDeviceNames(prevData => [...prevData, ...res.data]);
        })
        .catch(error => {
          console.error(' Error is:', error);
          notification.error({
            message: error.message,
            description: 'Có lỗi xảy ra, vui  lòng thử lại',
          });
        });

      await axiosInstance
        .get(
          `/devices?filters[name][$contains]=${search}&filters[status][$eq]=Available`
        )
        .then(res => {
          setDeviceNames(prevData => [...prevData, ...res.data]);
        })
        .catch(error => {
          console.error(' Error is:', error);
          notification.error({
            message: error.message,
            description: 'Có lỗi xảy ra, vui  lòng thử lại',
          });
        });
    };

    fetchDevice();
  }, [search]);

  useEffect(() => {
    if (DVS.length > 0 && user) {
      const checkedValue = DVS.map(device => ({
        label: device.name,
        value: device.id,
      }));
      setCheckedList(checkedValue);
    }
  }, [DVS, user]);

  const DebounceSearch = useCallback(
    debounce(nextValue => setSearch(nextValue), 700),
    []
  );

  const handleSearch = event => {
    DebounceSearch(event.target.value);
  };

  const handleDelete = record => {
    setCheckedList(checkedList.filter(item => item.value !== record.value));
  };

  const handleSubmit = values => {
    const deviceList = checkedList.map(item => item.value);

    const dataNewDeviceUpdate = {
      data: {
        status: 'Đang sử dụng',
      },
    };

    const dataNoneUseDeviceUpdate = {
      data: {
        status: 'Sẵn sàng',
      },
    };

    const data = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      dob: values.dob.format('YYYY-MM-DD'),
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      role: values.role,
      position: values.position,
      blocked: values.status,
      devices: deviceList,
      confirmed: true,
    };

    const newDevice = deviceList.filter(
      device => !DVS.some(dvsDevice => dvsDevice.id === device)
    );

    const noneUseDevice = DVS.filter(
      dvsDevice => !deviceList.some(device => device === dvsDevice.id)
    ).map(device => device.id);

    // console.log(newDevice);
    axiosInstance
      .put(`/users/${id}`, data)
      .then(response => {
        if (response != null) {
          newDevice.map(id => {
            return axiosInstance.put(`/devices/${id}`, dataNewDeviceUpdate);
          });
          noneUseDevice.map(id => {
            return axiosInstance.put(`/devices/${id}`, dataNoneUseDeviceUpdate);
          });
          notification.success({
            message: 'Update thành công',
            description: `Update thành công`,
          });
          navigate('/admin/users_list');
        }
      })
      .catch(error => {
        console.log(error);
        notification.warning({
          message: 'Error',
          description: `Error`,
        });
      });
  };

  const plainOptions = deviceNames.map(device => ({
    value: device.id,
    label: device.attributes.name,
  }));

  console.log(plainOptions);
  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Quản lý người dùng',
              href: '/admin/users_list',
            },
            {
              title: <b>{user.fullname}</b>,
              href: '',
            },
          ]}
        />
      </PathName>
      <Content>
        <Col>
          <Row>
            <Col
              span={24}
              style={{
                flexGrow: 1,
              }}
            >
              <Form
                id="myForm"
                name="basic"
                layout="vertical"
                initialValues={
                  {
                    // fullname: user.fullname,
                  }
                }
                autoComplete="off"
                form={form}
                onFinish={handleSubmit}
              >
                <Row>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="Name"
                      name="fullname"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner Name!',
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner Name"
                        // defaultValue={user.fullname}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: 'email',
                          message: 'Please input owner Email!',
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner email"
                        id="email"
                        // defaultValue={user.email}
                        disabled
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {' '}
                    <FormItem
                      label="UserName"
                      name="username"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner UserName!',
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner username"
                        // defaultValue={user.username}
                        disabled
                      />
                    </FormItem>
                  </Col>

                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Phone number"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner PhoneNumber!',
                        },
                        {
                          min: 10,
                          message:
                            'Phone number must be at least 10 characters',
                        },

                        {
                          max: 10,
                          message: 'Phone number must be at most 10 characters',
                        },
                        {
                          pattern: /^\d+$/,
                          message: 'Please enter numbers only',
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner email"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner Gender!',
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: '100%' }}
                        placeholder=" Select owner Gender"
                        optionFilterProp="children"
                        // defaultValue={user.gender}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                          {
                            value: 'male',
                            label: 'Male',
                          },
                          {
                            value: 'female',
                            label: 'Female',
                          },
                          {
                            value: 'other',
                            label: 'Other',
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="DOB"
                      name="dob"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner DOB!',
                        },
                      ]}
                    >
                      <DatePicker
                        size="default size"
                        style={{ width: '100%' }}
                        picker="date"
                        placeholder="Chose date of birth"
                        // defaultValue={dayjs(user.dob, 'YYYY-MM-DD')}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Role"
                      name="role"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner Role!',
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: '100%' }}
                        name="role"
                        placeholder=" Select owner Role"
                        optionFilterProp="children"
                        getOptionLabel={option => option.value.toString()}
                        // defaultValue={user.role?.name}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                          {
                            value: 1,
                            label: 'Admin',
                          },
                          {
                            value: 2,
                            label: 'User',
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Position"
                      name="position"
                      rules={[
                        {
                          required: true,

                          message: 'Please input owner position!',
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: '100%' }}
                        name="position"
                        placeholder=" Select owner position"
                        optionFilterProp="children"
                        getOptionLabel={option => option.value.toString()}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                          {
                            value: 'Học sinh',
                            label: 'Học sinh',
                          },
                          {
                            value: 'Giảng viên',
                            label: 'Giảng viên',
                          },
                          {
                            value: 'Phòng ban',
                            label: 'Phòng ban',
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {' '}
                    <FormItem
                      label="Status"
                      name="status"
                      rules={[
                        {
                          required: true,
                          message: 'Please input owner Status!',
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: '100%' }}
                        placeholder=" Select owner Status"
                        optionFilterProp="children"
                        optionValueProp="value"
                        // defaultValue={(user.blocked === false) ? 'Active' : 'Inactive'}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                          {
                            value: false,
                            label: 'Active',
                          },
                          {
                            value: true,
                            label: 'Inactive',
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Devices" name="Devices" rules={[{}]}>
                      <Row style={{ border: '1px solid #dcd2d2' }}>
                        <Col
                          span={12}
                          style={{
                            padding: '10px 10px 10px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Input
                            placeholder="Devices name..."
                            suffix={<SearchOutlined />}
                            size="default size"
                            onChange={handleSearch}
                          />
                          <Form.Item name="Devices">
                            <List
                              style={{
                                height: 130,
                                overflowY: 'auto',
                              }}
                              dataSource={plainOptions}
                              renderItem={item => (
                                <List.Item>
                                  <Checkbox
                                    value={item.label}
                                    checked={checkedList?.some(
                                      o => o.value === item.value
                                    )}
                                    onChange={e => {
                                      if (e.target.checked) {
                                        setCheckedList([...checkedList, item]);
                                      } else {
                                        setCheckedList(
                                          checkedList.filter(
                                            o => o.value !== item.value
                                          )
                                        );
                                      }
                                    }}
                                  >
                                    {item.label}
                                  </Checkbox>
                                </List.Item>
                              )}
                            />
                          </Form.Item>
                        </Col>

                        <Col
                          span={12}
                          style={{
                            borderLeft: '1px solid #dcd2d2',
                            padding: 10,
                          }}
                        >
                          <p style={{ fontWeight: 'bold' }}>
                            Seclect Devices ({checkedList.length})
                          </p>
                          <Table
                            style={{
                              height: 150,
                              overflowY: 'auto',
                            }}
                            pagination={false}
                            dataSource={checkedList.sort(
                              (a, b) => a.value - b.value
                            )}
                            columns={[
                              {
                                dataIndex: 'label',
                                key: 'label',
                              },
                              {
                                render: (text, record) => (
                                  <img
                                    style={{
                                      float: 'right',
                                    }}
                                    onClick={() => handleDelete(record)}
                                    src={icon}
                                    className={''}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                ),
                              },
                            ]}
                          />
                          <div></div>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Row style={{ borderTop: '1px solid #dcd2d2' }}>
            <Space style={{ paddingTop: 10 }}>
              <Button
                block
                style={buttonStyle}
                form="myForm"
                key="submit"
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  navigate('/admin/users_list');
                }}
              >
                Cancel
              </Button>
            </Space>
          </Row>
        </Col>
      </Content>
    </>
  );
};
export default UpdateUser;
