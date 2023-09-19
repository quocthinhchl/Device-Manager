import { Button, Descriptions, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../shared/services/http-client';

const UserBorrowHistoryDetail = ({ open, onCancel, idBorrow }) => {
  const [borrowData, setBorrowData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/borrow-requests/${idBorrow}?populate=device,user`)
        .then(res => {
          setBorrowData(res.data);
        })
        .catch(e => console.log(e));
    };
    fetchData();
  }, [idBorrow]);

  const ModalFooter = [
    <Button key="back" onClick={onCancel}>
      Trở về
    </Button>,
  ];

  return (
    <Modal
      title="Borrow Request Detail"
      open={open}
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
        <Descriptions.Item label="Trạng thái" span={3}>
          {borrowData?.attributes?.status}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserBorrowHistoryDetail;
