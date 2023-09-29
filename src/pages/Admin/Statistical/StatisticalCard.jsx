import { Card, Statistic } from 'antd';
import React from 'react';

import styled from 'styled-components';

const StyledCard = styled(Card)`
  .ant-card-body {
    width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 10px 0px #00000040;
  }

  .ant-card-body .ant-statistic .ant-statistic-title {
    color: black;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body .ant-statistic {
    width: 180px;
  }
`;

export const StatisticalCard = ({ title, value, icon }) => {
  return (
    <div>
      <StyledCard bordered={false}>
        <Statistic
          title={title}
          value={value}
          valueStyle={{ color: '#089e30' }}
          // suffix="%"
        />
        {icon}
      </StyledCard>
    </div>
  );
};
