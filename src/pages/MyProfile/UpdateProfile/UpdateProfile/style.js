import { Upload } from 'antd';
import styled from 'styled-components';
export const UploadContainer = styled(Upload)`
  & .ant-upload-list .ant-upload {
    width: 300px !important;
    height: 300px !important;
  }

  & .ant-upload-list .ant-upload-list-item-container .ant-upload-list-item {
    width: 300px;
    height: 300px !important;
  }
`;
