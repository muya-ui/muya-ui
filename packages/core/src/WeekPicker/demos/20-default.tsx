import React from 'react';
import styled from 'styled-components';

import { Typography, WeekPicker } from '@muya-ui/core';

const Container = styled.div``;

export default function DefaultDemo() {
  return (
    <Container>
      <Typography.Paragraph>设置默认值</Typography.Paragraph>
      <WeekPicker placeholder="选择周" defaultValue="2020-06-15" />

      <Typography.Paragraph>
        <br />
        面板默认打开日期
      </Typography.Paragraph>
      <WeekPicker placeholder="选择周" defaultViewDate="2020-06-15" />
    </Container>
  );
}

export const meta = {
  title: '默认值',
  desc: '设置默认选中，或者默认打开面板的日期',
};
