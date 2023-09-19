import { Button, Descriptions, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../shared/services/http-client';
const { Option } = Select;

const BorrowRequestDetail = ({ open, onOk, onCancel, idBorrow }) => {
  const [borrowData, setBorrowData] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/borrow-requests/${idBorrow}?populate=device,user`)
        .then(res => {
          setBorrowData(res.data);
          setSelectedStatus(res.data?.attributes?.status);
        })
        .catch(e => console.log(e));
    };
    fetchData();
  }, [idBorrow]);

  useEffect(() => {
    if (selectedStatus) {
      form.setFieldsValue({
        status: selectedStatus,
      });
    }
  }, [selectedStatus, form]);

  const handleStatusChange = status => {
    // console.log(selectedStatus);
    setSelectedStatus(status);
  };

  const BorrowOptions = () => {
    if (borrowData?.attributes?.status) {
      switch (borrowData?.attributes?.status) {
        case 'Phê duyệt':
          return (
            <>
              {/* <Option key="Phê duyệt" value="Phê duyệt">
                Phê duyệt
              </Option> */}
              <Option key="Đang mượn" value="Đang mượn">
                Đang mượn
              </Option>
              <Option key="Không lấy" value="Không lấy">
                Không lấy
              </Option>
            </>
          );
        case 'Đang mượn':
          return (
            <>
              {/* <Option key="Đang mượn" value="Đang mượn">
                Đang mượn
              </Option> */}
              <Option key="Đã trả" value="Đã trả">
                Đã trả
              </Option>
              <Option key="Mất" value="Mất">
                Mất
              </Option>
            </>
          );
        case 'Đã trả':
          return (
            <>
              <Option key="Đã trả" value="Đã trả" disabled>
                Đã trả
              </Option>
            </>
          );
        case 'Mất':
          return (
            <>
              <Option key="Mất" value="Mất" disabled>
                Mất
              </Option>
            </>
          );
        default:
          return (
            <>
              {/* <Option key="Chờ" value="Chờ">
                Chờ
              </Option> */}
              <Option key="Phê duyệt" value="Phê duyệt">
                Phê duyệt
              </Option>
              <Option key="Từ chối" value="Từ chối">
                Từ chối
              </Option>
            </>
          );
      }
    }
  };

  const ModalFooter = [
    <Button key="back" onClick={onCancel}>
      Trở về
    </Button>,
    <Button
      key="approve"
      type="primary"
      onClick={() =>
        onOk(
          borrowData?.attributes?.user.data?.id,
          borrowData?.attributes?.device.data?.id,
          selectedStatus
        )
      }
    >
      Cập nhật
    </Button>,
  ];

  return (
    <Modal
      title="Borrow Request Detail"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={ModalFooter}
    >
      <br />
      <Descriptions>
        <Descriptions.Item label="Người dùng" span={3}>
          {borrowData?.attributes?.user.data?.attributes.username}
        </Descriptions.Item>
        <Descriptions.Item label="Chức vụ" span={3}>
          {borrowData?.attributes?.user.data?.attributes.position}
        </Descriptions.Item>
        <Descriptions.Item label="Thiết bị" span={3}>
          {borrowData?.attributes?.device.data?.attributes.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày mượn" span={3}>
          {borrowData?.attributes?.borrow_date}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày trả" span={3}>
          {borrowData?.attributes?.return_date}
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Trạng thái" name="status">
          <Select onChange={handleStatusChange}>{BorrowOptions()}</Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BorrowRequestDetail;
