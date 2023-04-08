import {
    Dropdown,
    Space,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const items = [
    {
        label: <a href="#">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="#">2nd menu item</a>,
        key: '1',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];
const DropDown = styled.div`
    .ant-dropdown-menu-root{
        top: 4px;
        right: 8px;
    }
    .anticon-down{
        border-right:2px solid #cbb4b4;
        padding-right:8px;
    }
`
const SelectOption = () => (
    <DropDown>
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Option
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </DropDown>
);
export default SelectOption;
