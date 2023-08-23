/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  theme,
  Button,
  Space,
  Input,
  Form,
  DatePicker,
  Modal,
  Divider,
  notification,
  Breadcrumb,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UploadContainer } from './style';
import axiosInstance from '../../../shared/services/http-client';
// import ImgCrop from 'antd-img-crop';

import { API } from '../../../shared/constants';
import Upload from 'antd/es/upload/Upload';
import {
  UserProfile,
  updateAvatarUserProfileAction,
  updateUserProfileAction,
} from '../../../stores/Slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
  width: 150,
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
  margin: 15px 16px;
  padding: 24px;
  background: #ffffff;

  border-radius: 10px;
`;

const UpdateProfile = props => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector(UserProfile);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      url: `${API}${userProfile.user_profile.avatar?.url}`,
    },
  ]);
  // const formData = new FormData();
  const [image, setImage] = useState();

  const handleCancel = () => setPreviewOpen(false);

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

  const handleBeforeUpload = file => {
    const uploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'uploading',
    };
    setFileList(prevList => [...prevList, uploadFile]);
    return false; // prevent default upload behavior
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const formData = new FormData();
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', `${userProfile.user_profile.id}`);
    formData.append('field', 'avatar');
    const file = newFileList[0].originFileObj;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('Chỉ chấp nhận file ảnh định dạng JPG hoặc PNG');
      return;
    }
    formData.append('files', file);
    // console.log(11, formData);
    setImage(formData);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const [form] = Form.useForm();

  const onFinish = async values => {
    const data = {
      fullname: values.fullname,
      dob: values.dob.format('YYYY-MM-DD'),
      phoneNumber: values.phoneNumber,
    };
    // console.log(77, data);
    try {
      // console.log(77, fileList);
      if (fileList[0].url !== `${API}${userProfile.user_profile.avatar?.url}`) {
        await dispatch(updateAvatarUserProfileAction({ image })).unwrap();
      }
      await dispatch(
        updateUserProfileAction({ id: userProfile.user_profile.id, data })
      ).unwrap();
      navigate('/dashboard/myprofile');
      notification.success({
        message: 'Cập nhật thông tin thành công',
      });
    } catch (error) {
      notification.error({
        message: error.message,
        description: 'Có lỗi xảy ra, vui lòng thử lại',
      });
    }
  };

  useEffect(() => {
    // set default value for fullname field when user state changes
    if (userProfile.user_profile) {
      form.setFieldsValue({
        fullname: userProfile.user_profile.fullname,

        username: userProfile.user_profile.username,
        email: userProfile.user_profile.email,
        phoneNumber: userProfile.user_profile.phoneNumber,

        dob: dayjs(userProfile.user_profile.dob, 'YYYY-MM-DD'),
        role: userProfile.user_profile.role?.name,
      });
    }
    setFileList([
      {
        url: `${API}${userProfile.user_profile.avatar?.url}`,
      },
    ]);
    // console.log(88, user);
  }, [userProfile.user_profile]);

  return (
    <>
      <PathName>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'View Profile',
              href: '/dashboard/myprofile',
            },
            {
              title: <b>{userProfile.user_profile.fullname}</b>,
              href: '',
            },
          ]}
        />
      </PathName>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px  ',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '40%',
            paddingLeft: 20,
            flexGrow: 1,
          }}
        >
          {/* <ImgCrop > */}
          <UploadContainer
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={handleBeforeUpload}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </UploadContainer>
          {/* </ImgCrop> */}

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
        </div>
        <div
          style={{
            width: '60%',
            flexGrow: 1,
          }}
        >
          <Form
            id="myForm"
            layout="vertical"
            // form={form}

            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="fullname"
              label="Full Name:"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
                { whitespace: true },
                { min: 3 },
              ]}
            >
              <Input
                placeholder="Type your name"
                // defaultValue={props.userData.fullname}
              />
            </Form.Item>
            <Form.Item name="username" label="Username:">
              <Input disabled />
            </Form.Item>

            <Form.Item name="email" label="Email:">
              <Input
                placeholder="Type your email"
                // defaultValue={props.userData.email}
                disabled
              ></Input>
            </Form.Item>
            <div style={{ display: 'flex', width: '100%' }}>
              <Space size={'large'}>
                <Form.Item
                  name="dob"
                  label="Date of Birth:"
                  rules={[
                    {
                      required: true,
                      message: 'Please provide your date of birth',
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    picker="date"
                    placeholder="Chose date of birth"
                    // defaultValue={dayjs(props.userData.dob, 'YYYY-MM-DD')}
                  />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number:"
                  rules={[
                    {
                      required: true,

                      message: 'Please input owner PhoneNumber!',
                    },
                    {
                      min: 10,
                      message: 'Phone number must be at least 10 characters',
                    },

                    {
                      max: 10,
                      message: 'Phone number must be at most 10 characters',
                    },
                    { pattern: /^\d+$/, message: 'Please enter numbers only' },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    // defaultValue={props.userData.phoneNumber}
                  />
                </Form.Item>
              </Space>
            </div>

            <Form.Item name="role" label="Role:">
              <Input
                style={{ width: '100%' }}
                placeholder="role"
                // defaultValue={props.userData.role.name}
                disabled
              />
            </Form.Item>
          </Form>
        </div>

        <div
          style={{
            width: '100%',
          }}
        >
          <Divider />

          <Space>
            <Button
              block
              style={buttonStyle}
              form="myForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                navigate('/dashboard/myprofile');
              }}
              style={{
                width: 120,
              }}
            >
              Back
            </Button>
          </Space>
        </div>
      </Content>
    </>
  );
};
export default UpdateProfile;
