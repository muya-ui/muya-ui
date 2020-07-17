import React from 'react';
import styled from 'styled-components';

import { Calendar } from '@muya-ui/core';

const Container = styled.div`
  display: flex;

  & .calendar {
    width: 480px;
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
  }

  & .custom-item {
    text-align: center;
  }

  & .custom-block {
    padding-top: 30px;
  }
`;

export default function CustomDemo() {
  return (
    <Container>
      <Calendar
        selectType="date"
        className="calendar"
        styles={{
          panelItem: {
            height: 50,
          },
          panelDecadeBlock: 'custom-block',
          panelYearBlock: 'custom-block',
        }}
        renderMonthItem={(date, status) => {
          return (
            <div className="custom-item">
              <div>{date.format('DD')}</div>
              <div>{status}</div>
            </div>
          );
        }}
      />
    </Container>
  );
}

export const meta = {
  title: '自定义样式',
  desc: '自定义样式',
};
