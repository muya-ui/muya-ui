import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { DatePicker } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 20px;
`;

const firstDayOfJune = dayjs(`${dayjs().get('y')}-06-01`);
const formatFn = (date: Dayjs) => {
  const periodStr = date.isBefore(firstDayOfJune) ? 'H1' : 'H2';
  return `${date.format('YYYY')}年${periodStr}`;
};

export default function FormatDemo() {
  return (
    <>
      <Container>
        <DatePicker placeholder="YYYY/MM/DD" format="YYYY/MM/DD" />
      </Container>
      <Container>
        <DatePicker placeholder="使用函数自定义" format={formatFn} />
      </Container>
    </>
  );
}

export const meta = {
  title: '自定义日期显示',
  desc: '自定义日期显示格式',
};
