import { Button, Descriptions, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../shared/services/http-client';
const { Option } = Select;

const AdminRepairRequestDetail = ({ open, onOk, onCancel, idBorrow }) => {
  const [repairData, setRepairData] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    axiosInstance
      .get(`/repair-requests/${idBorrow}?populate=device,user,staff`)
      .then(res => {
        setRepairData(res.data);
        setSelectedStatus(res.data?.attributes?.status);
        // console.log(selectedStaff);
      })
      .catch(e => console.log(e));
  }, [idBorrow]);

  useEffect(() => {
    if (selectedStatus) {
      form.setFieldsValue({
        status: selectedStatus,
      });
    }
  }, [selectedStatus, form]);

  const RepairOptions = () => {
    if (repairData?.attributes?.status) {
      switch (repairData?.attributes?.status) {
        case 'Phê duyệt':
          return (
            <>
              <Option key="Đang mượn" value="Đang mượn">
                Đang mượn
              </Option>
              <Option key="Không lấy" value="Không lấy">
                Không lấy
              </Option>
            </>
          );

        default:
          return (
            <>
              <Option key="Chờ sửa chữa" value="Chờ sửa chữa">
                Chờ sửa chữa
              </Option>
              <Option key="Đang sửa chữa" value="Đang sửa chữa">
                Đang sửa chữa
              </Option>
              <Option key="Đã xong" value="Đã xong">
                Đã xong
              </Option>
            </>
          );
      }
    }
  };

  const handleStatusChange = status => {
    setSelectedStatus(status);
  };

  const ModalFooter = [
    <Button key="back" onClick={onCancel}>
      Trở về
    </Button>,
    <Button
      key="approve"
      type="primary"
      onClick={() =>
        onOk(repairData?.attributes?.device.data?.id, selectedStatus)
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
          {repairData?.attributes?.user.data?.attributes.username}
        </Descriptions.Item>
        <Descriptions.Item label="Thiết bị" span={3}>
          {repairData?.attributes?.device.data?.attributes.name}
        </Descriptions.Item>
        <Descriptions.Item label="Vị trí" span={3}>
          {repairData?.attributes?.location}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={3}>
          {repairData?.attributes?.description}
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Trạng thái" name="status">
          <Select onChange={handleStatusChange}>{RepairOptions()}</Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminRepairRequestDetail;
