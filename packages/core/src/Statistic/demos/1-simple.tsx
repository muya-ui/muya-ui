import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';

import { countdown, useAfterEffect } from '@muya-ui/utils';
import { Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;

  & .col {
    width: 200px;
  }
`;

const targetDate = dayjs()
  .add(40, 'day')
  .add(4, 'hour');

function refreshCD() {
  const remain = targetDate.diff(dayjs());
  return countdown(remain);
}

export default function Simple() {
  const [cd, setCD] = useState(refreshCD());

  useAfterEffect(() => {
    setCD(refreshCD());
  }, 1000);

  return (
    <Container>
      <div className="col">
        <Typography.Title level={5}>时分秒倒计时</Typography.Title>
        <Typography.Paragraph>
          {cd.H.toString().padStart(2, '0')}:{cd.m.toString().padStart(2, '0')}:
          {cd.s.toString().padStart(2, '0')}
        </Typography.Paragraph>
      </div>
      <div className="col">
        <Typography.Title level={5}>天数倒计时</Typography.Title>
        <Typography.Paragraph>
          {cd.D}天{cd.H}时{cd.m}分{cd.s}秒
        </Typography.Paragraph>
      </div>
    </Container>
  );
}

export const meta = {
  title: '倒计时',
  desc: '倒计时',
};
