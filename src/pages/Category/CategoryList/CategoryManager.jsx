import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Select, Space } from 'antd';
// import { useDebounce } from 'use-debounce';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import debounce from 'lodash.debounce';
import CategoryTable from './CategoryTable';

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
function CategoryManager() {
  const [selectedValue, setSelectedValue] = useState('code');
  const [keyWord, setKeyWord] = useState('');

  const navigate = useNavigate();

  function handleSelect(value) {
    setSelectedValue(value);
    console.log(6666, selectedValue);
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
              <h3>All Category</h3>
            </Col>
            <Col>
              <Button
                style={buttonStyle}
                onClick={() => {
                  navigate('/dashboard/admin/category_list/create');
                }}
              >
                {' '}
                Add Category
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
            </Space>
          </Row>
          <Row>
            <CategoryTable selectOption={selectedValue} keyWord={keyWord} />
          </Row>
        </Space>
      </Content>
    </UserLayout>
  );
}

export default CategoryManager;
