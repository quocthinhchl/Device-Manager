import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Select, Space, notification } from 'antd';
// import { useDebounce } from 'use-debounce';
import styled from 'styled-components';
import { SearchOutlined, ShrinkOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../../shared/services/http-client';
import UserBorrowHistoryTable from './UserBorrowHistoryTable';
import exportExcel from '../../../../components/exportExcel/exportExcel';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../../../stores/Slice/UserSlice';
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
const buttonStyle = {
  backgroundColor: '#8767E1',
  color: '#fff',
};
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

function UserBorrowHistoryList() {
  const [selectedValue, setSelectedValue] = useState('code');
  const [keyWord, setKeyWord] = useState('');
  const [categories, setCategories] = useState('');
  const [idCategory, setIdCategory] = useState([]);
  const userProfile = useSelector(UserProfile);

  useEffect(() => {
    axiosInstance
      .get(`/categories`)
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        // console.error(' Error is:', error);
        notification.error({
          message: error.message,
          description: 'Có lỗi xảy ra, vui  lòng thử lại',
        });
      });
  }, []);

  const handleExportExcel = () => {
    axiosInstance
      .get(
        `/borrow-requests?&populate=user,device&filters[user][id][$eq]=${userProfile.user_profile.id}`
      )
      .then(res => {
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

  function handleCategoryChange(value) {
    setIdCategory(value);
  }

  const DebounceSearch = useCallback(
    debounce(nextValue => setKeyWord(nextValue), 700),
    []
  );
  const handleSearchValueChange = event => {
    DebounceSearch(event.target.value);
  };

  const categoryOptions = () => {
    if (!categories) {
      return null;
    }
    return categories?.map(category => (
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

  return (
    <UserLayout>
      <Content>
        <Space direction="vertical" size={24}>
          <Row justify={'space-between'}>
            <Col>
              <h3>Lịch sử mượn trả</h3>
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
                    defaultValue="code"
                    style={{
                      width: 120,
                    }}
                    onChange={handleSelect}
                    options={[
                      {
                        value: 'code',
                        label: 'Code',
                      },
                      {
                        value: 'name',
                        label: 'Name',
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
                    placeholder="Chọn danh mục"
                    onChange={handleCategoryChange}
                    mode="multiple"
                    showSearch
                    filterOption={filterOption}
                    style={{ width: '250px' }}
                  >
                    {categoryOptions()}
                  </Select>
                </Space>
              </Col>
            </Space>
          </Row>
          <Row>
            <UserBorrowHistoryTable
              selectOption={selectedValue}
              keyWord={keyWord}
              idCategory={idCategory}
            />
          </Row>
        </Space>
      </Content>
    </UserLayout>
  );
}

export default UserBorrowHistoryList;
