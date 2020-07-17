import React from 'react';
import styled from 'styled-components';

import { DatePicker, RangeDatePicker, Typography } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 10px;

  & .disable-btn,
  & .range-date-picker {
    margin-left: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  margin-top: 10px;
`;

const rangePlaceholder = ['开始时间', '结束时间'];
export default function DefaultDemo() {
  const defaultValue = React.useMemo(() => ['2020-01-08', '2020-01-10'], []);
  const defaultViewDate = React.useMemo(() => ['2013-01-08', '2013-05-10'], []);
  return (
    <div>
      <Container>
        <Typography.Paragraph>设置默认选中的日期</Typography.Paragraph>
        <Row>
          <DatePicker defaultValue="2020-01-01" placeholder="选择时间" />
          <RangeDatePicker
            className="range-date-picker"
            defaultValue={defaultValue}
            placeholder={rangePlaceholder}
          />
        </Row>
      </Container>
      <Container>
        <Typography.Paragraph>设置面板默认展开的日期</Typography.Paragraph>
        <Row>
          <DatePicker defaultViewDate="2019-06-01" placeholder="选择时间" />
          <RangeDatePicker
            className="range-date-picker"
            defaultViewDate={defaultViewDate}
            placeholder={rangePlaceholder}
          />
        </Row>
      </Container>
    </div>
  );
}

export const meta = {
  title: '设置默认值',
  desc: '设置默认值，或者设置默认展开的面板',
};
