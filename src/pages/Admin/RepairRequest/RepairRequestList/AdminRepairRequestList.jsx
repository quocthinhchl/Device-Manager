import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Select, Space, notification } from 'antd';
import styled from 'styled-components';
import { SearchOutlined, ShrinkOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import AdminRepairRequestTable from './AdminRepairRequestTable';
const { Option } = Select;

const UserLayout = styled.div`
  display: flex;
  justify-content: 'space-evenly';
  flex-direction: 'column';
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  .ant-table-cell a {
    margin: 0px 3px;
  }
  .ant-space-compact .ant-select-compact-item .ant-select-selector {
    border-right: none;
    width: 120px;
  }
  .ant-space-compact .ant-input-compact-last-item {
    border: none !important;
  }
  .ant-space-compact .ant-select-compact-item .ant-select-selector {
    border: none !important;
  }
  .ant-space-compact .ant-select-compact-item .ant-select-arrow {
    padding-right: 10px;
    border-right: 1px solid #cbcbcb;
  }
  .ant-dropdown {
    margin-top: 4px;
  }
  .ant-space-compact {
    border: 1px solid #cbcbcb;
    border-radius: 5px;
  }
`;
const Content = styled.div`
  margin: 26px 20px;
  padding: 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
`;

const options = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'Available',
    label: 'Available',
  },
  {
    value: 'In Use',
    label: 'In Use',
  },
  {
    value: 'Faulty',
    label: 'Faulty',
  },
  {
    value: 'In Repair',
    label: 'In Repair',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
];

function AdminRepairRequestList() {
  const [selectedValue, setSelectedValue] = useState('code');
  const [status, setStatus] = useState('all');
  const [keyWord, setKeyWord] = useState('');

  function handleSelect(value) {
    setSelectedValue(value);
  }

  function handleSelectBlocked(value) {
    setStatus(value);
  }

  const DebounceSearch = useCallback(
    debounce(nextValue => setKeyWord(nextValue), 700),
    []
  );
  const handleSearchValueChange = event => {
    DebounceSearch(event.target.value);
  };

  return (
    <UserLayout>
      <Content>
        <Space direction="vertical" size={24}>
          <Row justify={'space-between'}>
            <Col>
              <h3>Quản lý yêu cầu sửa chữa</h3>
            </Col>
          </Row>

          <Row>
            <Space>
              <Col>
                <Space.Compact block>
                  <Select
                    defaultValue="id"
                    style={{
                      width: 120,
                    }}
                    onChange={handleSelect}
                    options={[
                      {
                        value: 'id',
                        label: 'User ID',
                      },
                    ]}
                  />
                  <Input
                    suffix={<SearchOutlined />}
                    onChange={handleSearchValueChange}
                    enterButton
                    placeholder="Search"
                  />
                </Space.Compact>
              </Col>
              <Col>
                <Space
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Select
                    defaultValue="all"
                    onChange={handleSelectBlocked}
                    style={{
                      width: 200,
                    }}
                    options={options}
                  />
                </Space>
              </Col>
            </Space>
          </Row>
          <Row>
            <AdminRepairRequestTable
              selectOption={selectedValue}
              keyWord={keyWord}
              status={status}
            />
          </Row>
        </Space>
      </Content>
    </UserLayout>
  );
}

export default AdminRepairRequestList;
