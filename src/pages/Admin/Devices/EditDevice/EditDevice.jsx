import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  UserOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axiosInstance from '../../../../shared/services/http-client';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { API } from '../../../../shared/constants';
const { Option } = Select;

const Content = styled.div`
  margin: 15px 16px;
  padding: 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  .ant-form-item .ant-input,
  .ant-form-item .ant-select {
    width: 299px;
    height: 36px;
  }
  button {
    width: 80px;
    height: 33px;
  }
  .ant-form-vertical .ant-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .ant-form-vertical .ant-form-item:last-child {
    padding-top: 10px;
  }
`;

const UploadContainer = styled(Upload)`
  .ant-upload {
    width: 250px !important;
    height: 250px !important;
  }

  .ant-upload-list {
    margin: 30px 30px 30px 30px;
  }
  .ant-upload-list .ant-upload-list-item-container {
    width: 250px !important;
    height: 250px !important;
  }
`;

const PathName = styled.p`
  margin: 10px 25px 0px 20px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #111111;
`;

const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default function EditDevice() {
  const [categories, setCategories] = useState('');
  const [status, setStatus] = useState('Sẵn sàng');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deviceDetail, setDeviceDetail] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [defaultValues, setDefaultValues] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/devices/${id}?populate=category,image`).then(res => {
      setDeviceDetail(res.data);
    });
    axiosInstance.get('/categories').then(res => {
      setCategories(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (deviceDetail) {
      setFileList([
        {
          url: `${API}${deviceDetail.attributes.image?.data?.attributes.url}`,
        },
      ]);
      form.setFieldsValue({
        code: deviceDetail.attributes.code,
        name: deviceDetail.attributes.name,
        status: deviceDetail.attributes.status,
        category: deviceDetail.attributes.category.data?.id,
        location: deviceDetail.attributes.location,
        description: deviceDetail.attributes.description,
      });
    }
  }, [deviceDetail, form]);

  const categoryOptions = () => {
    if (!categories) {
      return null;
    }
    return categories.map(category => (
      <Option key={category.id} value={category.id}>
        {category.attributes.name}
      </Option>
    ));
  };

  const filterOption = (input, option) => {
    if (option?.children) {
      return option.children
        .toString()
        .toLowerCase()
        .includes(input.toLowerCase());
    }
    return false;
  };

  const previewCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    if (!newFileList[0]) {
      setFileList(newFileList);
    } else {
      const file = newFileList[0].originFileObj;
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        alert('Chỉ chấp nhận file ảnh định dạng JPG hoặc PNG');
        return;
      }
      setFileList(newFileList);
    }
  };

  const handleBeforeUpload = () => {
    return false;
  };

  const handleGetStatus = e => {
    setStatus(e);
  };

  const showModal = values => {
    setIsModalVisible(true);
    setDefaultValues({
      code: values.code,
      name: values.name,
      status: values.status,
      category: values.category,
      location: values.location,
      description: values.description,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    var file = undefined;
    if (
      fileList[0].url !==
      `${API}${deviceDetail.attributes?.image?.data?.attributes.url}`
    ) {
      file = fileList[0].originFileObj;
    }
    // console.log(file);
    const formData = new FormData();
    const data = {
      code: defaultValues.code,
      name: defaultValues.name,
      status: defaultValues.status,
      category: defaultValues.category,
      location: defaultValues.location,
      description: defaultValues.description,
    };
    formData.append('data', JSON.stringify(data));
    formData.append('files.image', file);

    //   console.log(data);
    await axiosInstance
      .put(`/devices/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        notification.success({
          message: 'Chỉnh sửa thành công',
          description: `Chỉnh sửa thành công ${res.data.attributes.name}.`,
        });
        navigate(`/admin/device_list/detail/${id}`);
      })
      .catch(e => {
        // console.log(11, e);
        notification.error({
          message: 'Lỗi',
          description: `Lỗi ${e.response.data.error.details.errors[0].path} ${e.response.data.error.details.errors[0].message}.`,
        });
      });
  };

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/admin/device_list">Quản lý thiết bị</Link>,
            },
            {
              title: (
                <Link to={`/admin/device_list/edit/${id}`}>
                  {deviceDetail.attributes?.name}
                </Link>
              ),
            },
          ]}
        />
      </PathName>
      <Content>
        <Form layout={'vertical'} onFinish={showModal} form={form}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px', flex: '1' }}>
              <UploadContainer
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </UploadContainer>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={previewCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </div>

            <div style={{ flex: '2' }}>
              <Space>
                <Form.Item
                  name="code"
                  label="Mã thiết bị"
                  rules={[
                    { required: true, message: 'Please enter device code' },
                    {
                      pattern: /^([a-zA-Z]{3})_([0-9]{3})$/,
                      message: 'Format must be XXX_YYY with Y is a numbers',
                    },
                  ]}
                >
                  <Input placeholder="Enter device code" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Tên thiết bị"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: 'string',
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Enter device name" />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item
                  label="Danh mục"
                  name="category"
                  rules={[
                    { required: true, message: 'Vui lòng chọn danh mục!' },
                  ]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    showSearch
                    filterOption={filterOption}
                  >
                    {categoryOptions()}
                  </Select>
                </Form.Item>

                <Form.Item label="Trạng thái" name="status">
                  <Select
                    placeholder="Select a status"
                    options={[
                      {
                        value: 'Sẵn sàng',
                        label: 'Sẵn sàng',
                      },
                      {
                        value: 'Đang mượn',
                        label: 'Đang mượn',
                      },
                      {
                        value: 'Đang sử dụng',
                        label: 'Đang sử dụng',
                      },
                      {
                        value: 'Đang sửa chữa',
                        label: 'Đang sửa chữa',
                      },
                      {
                        value: 'Hỏng',
                        label: 'Hỏng',
                      },
                      {
                        value: 'Mất',
                        label: 'Mất',
                      },
                    ]}
                    defaultValue={'Sẵn sàng'}
                    onChange={handleGetStatus}
                  />
                </Form.Item>
              </Space>

              <Form.Item
                label="Vị trí"
                name="location"
                rules={[{ required: true, message: 'Please input location' }]}
                // style={{ width: '100%', height: 120, paddingBottom: 10 }}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Enter device location"
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Please input Intro' }]}
                style={{ width: '100%', height: 120, paddingBottom: 10 }}
              >
                <Input.TextArea style={{ width: '100%', height: 120 }} />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Row>
              <Divider />
              <Space>
                <Button style={buttonStyle} htmlType="submit">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    navigate('/admin/device_list');
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
        <Modal
          title="Xác nhận chỉnh sửa"
          open={isModalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="Đồng ý"
          cancelText="Hủy bỏ"
        >
          <p>Bạn có chắc muốn chỉnh sửa không không?</p>
        </Modal>
      </Content>
    </>
  );
}
