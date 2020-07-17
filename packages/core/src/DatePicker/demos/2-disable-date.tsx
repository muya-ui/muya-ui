import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { DatePicker, RangeDatePicker, Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

const rangePlaceholder = ['开始时间', '结束时间'];
export default function DisableDemo() {
  const disableRange = React.useMemo(() => [dayjs(), dayjs().add(7, 'day')] as [Dayjs, Dayjs], []);
  const disableDate = React.useMemo(
    () => (date: Dayjs) => {
      return date.isSame(dayjs().add(10, 'day'), 'date');
    },
    [],
  );
  return (
    <div>
      <Container>
        <DatePicker placeholder="选择日期" disableDate={disableDate} disableRange={disableRange} />
      </Container>
      <Container>
        <RangeDatePicker
          className="range-date-picker"
          placeholder={rangePlaceholder}
          disableDate={disableDate}
          disableRange={disableRange}
        />
      </Container>
      <Typography.Paragraph>禁用今后7天，还有后面的第10天</Typography.Paragraph>
    </div>
  );
}

export const meta = {
  title: '禁用日期',
  desc: '禁用某一些日期',
};
