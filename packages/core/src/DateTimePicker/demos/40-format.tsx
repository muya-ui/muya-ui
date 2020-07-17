import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { DateTimePicker, Typography } from '@muya-ui/core';

const Container = styled.div``;

const formatDate = (date: Dayjs) => {
  return `Time: ${date.format('MM.DD H:m')}`;
};

export default function FormatDemo() {
  return (
    <Container>
      <Typography.Paragraph>自定义格式</Typography.Paragraph>
      <DateTimePicker
        placeholder="选择时间"
        defaultValue="2020-06-15 10:00:00"
        format="MM-DD HH:mm"
      />

      <Typography.Paragraph>
        <br />
        通过函数来定义
      </Typography.Paragraph>
      <DateTimePicker placeholder="选择时间" defaultValue="2020-06-15 08:11" format={formatDate} />
    </Container>
  );
}

export const meta = {
  title: '自定义周显示',
  desc: '自定义周显示',
};
