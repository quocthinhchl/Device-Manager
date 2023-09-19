import { Button, Descriptions, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../shared/services/http-client';
const { Option } = Select;

const AdminRepairRequestDetail = ({ open, onOk, onCancel, idBorrow }) => {
  const [repairData, setRepairData] = useState();
  const [staffData, setStaffData] = useState();
  const [selectedStaff, setSelectedStaff] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/repair-requests/${idBorrow}?populate=device,user,staff`)
        .then(res => {
          setRepairData(res.data);
          if (res.data?.attributes?.staff.data !== null) {
            setSelectedStaff(res.data?.attributes?.staff.data?.id);
          } else setSelectedStaff('null');
          // console.log(selectedStaff);
        })
        .catch(e => console.log(e));
    };
    fetchData();
  }, [idBorrow]);

  useEffect(() => {
    if (selectedStaff) {
      form.setFieldsValue({
        staff: selectedStaff,
      });
    }
  }, [selectedStaff, form]);

  useEffect(() => {
    axiosInstance
      .get(`/users?populate=role&filters[role][id][$eq]=3`)
      .then(res => {
        setStaffData(res);
        // console.log(repairData);
      })
      .catch(e => console.log(e));
  }, []);

  const staffOptions = () => {
    if (!staffData) {
      return null;
    }

    const options = staffData.map(staff => (
      <Option key={staff.id} value={staff.id}>
        {staff.username}
      </Option>
    ));

    // Thêm một Option mới
    options.unshift(
      <Option key="null" value="null">
        Vui lòng chọn người sửa chữa
      </Option>
    );

    return options;
  };

  const handleStaffChange = id => {
    setSelectedStaff(id);
  };

  const ModalFooter = [
    <Button key="back" onClick={onCancel}>
      Trở về
    </Button>,
    <Button key="approve" type="primary" onClick={() => onOk(selectedStaff)}>
      Phân công
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
        <Descriptions.Item label="status" span={3}>
          {repairData?.attributes?.status}
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item
          label="Phân công sửa chữa"
          name="staff"
          rules={[{ required: true, message: 'Vui lòng chọn người sửa chữa' }]}
        >
          <Select
            onChange={handleStaffChange}
            placeholder="Vui lòng chọn người sửa chữa"
          >
            {staffOptions()}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminRepairRequestDetail;
