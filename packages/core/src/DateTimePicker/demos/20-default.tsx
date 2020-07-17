import React from 'react';
import styled from 'styled-components';

import { DateTimePicker, Typography } from '@muya-ui/core';

const Container = styled.div``;

export default function DefaultDemo() {
  return (
    <Container>
      <Typography.Paragraph>设置默认值</Typography.Paragraph>
      <DateTimePicker placeholder="选择时间" defaultValue="2020-06-15 11:00:00" />

      <Typography.Paragraph>
        <br />
        面板默认打开日期
      </Typography.Paragraph>
      <DateTimePicker placeholder="选择时间" defaultViewDate="2020-07-15" />
    </Container>
  );
}

export const meta = {
  title: '默认值',
  desc: '设置默认选中，或者默认打开面板的日期',
};
