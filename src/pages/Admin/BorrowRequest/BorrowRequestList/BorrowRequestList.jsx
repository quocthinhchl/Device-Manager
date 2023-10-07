import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Select, Space, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import styled from 'styled-components';
import { SearchOutlined, ShrinkOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../../shared/services/http-client';
import BorrowRequestTable from './BorrowRequestTable';
import exportExcel from '../../../../components/exportExcel/exportExcel';
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
    value: 'Chờ',
    label: 'Chờ',
  },
  {
    value: 'Phê duyệt',
    label: 'Phê duyệt',
  },
  {
    value: 'Từ chối',
    label: 'Từ chối',
  },
  {
    value: 'Đang mượn',
    label: 'Đang mượn',
  },
  {
    value: 'Đã trả',
    label: 'Đã trả',
  },
  {
    value: 'Mất',
    label: 'Mất',
  },
];

function BorrowRequestList() {
  const [selectedValue, setSelectedValue] = useState('code');
  const [status, setStatus] = useState('all');
  const [keyWord, setKeyWord] = useState('');

  const handleExportExcel = () => {
    axiosInstance.get(`/borrow-requests?&populate=user,device`).then(res => {
      // console.log(22, res.data);
      const data = res.data.map(borrowRequest => ({
        id: borrowRequest.id,
        ...borrowRequest.attributes,
        device: borrowRequest.attributes.device.data?.attributes.name,
        user: borrowRequest.attributes.user.data?.attributes.fullname,
      }));
      exportExcel(data, 'Danh sách yêu cầu mượn trả', 'BorrowRequestList');
    });
  };

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
              <h3>Quản lý mượn trả</h3>
            </Col>
            <Col>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                  handleExportExcel();
                }}
              >
                Xuất excel
              </Button>
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
            <BorrowRequestTable
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

export default BorrowRequestList;
