import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  notification,
  theme,
} from 'antd';
// import { useDebounce } from 'use-debounce';
import styled from 'styled-components';
import { SearchOutlined, ShrinkOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import DeviceTable from './DeviceTable';
import { useDebounce } from 'use-debounce';
import debounce from 'lodash.debounce';
import axiosInstance from '../../../../shared/services/http-client';
import exportExcel from '../../../../components/exportExcel/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';
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

const options = [
  {
    value: 'all',
    label: 'Tất cả',
  },
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
];

function DeviceManager() {
  const [selectedValue, setSelectedValue] = useState('code');
  const [keyWord, setKeyWord] = useState('');
  const [status, setStatus] = useState('all');
  const [categories, setCategories] = useState('');
  const [idCategory, setIdCategory] = useState([]);
  const navigate = useNavigate();

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

  function handleSelect(value) {
    setSelectedValue(value);
    // console.log(6666, selectedValue);
  }

  function handleSelectBlocked(value) {
    setStatus(value);
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

  const handleExportExcel = () => {
    axiosInstance.get(`/devices?populate=category,user`).then(res => {
      // console.log(22, res.data);
      const data = res.data.map(device => ({
        id: device.id,
        ...device.attributes,
        category: device.attributes.category.data?.attributes.name,
        user: device.attributes.user.data?.attributes.fullname,
      }));
      exportExcel(data, 'Danh sách thiết bị', 'DeviceList');
    });
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
              <h3>Quản lý thiết bị</h3>
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

              <Button
                style={buttonStyle}
                onClick={() => {
                  navigate('/admin/device_list/create');
                }}
              >
                {' '}
                Thêm thiết bị
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
            <DeviceTable
              selectOption={selectedValue}
              keyWord={keyWord}
              status={status}
              idCategory={idCategory}
            />
          </Row>
        </Space>
      </Content>
    </UserLayout>
  );
}

export default DeviceManager;
