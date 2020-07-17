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

const targetDate = dayjs().add(4, 'day');

function refreshCD() {
  const remain = targetDate.diff(dayjs());
  return countdown(remain, 'H');
}

export default function Simple() {
  const [cd, setCD] = useState(refreshCD());

  useAfterEffect(() => {
    setCD(refreshCD());
  }, 1);

  return (
    <Container>
      <div className="col">
        <Typography.Title level={5}>毫秒倒计时</Typography.Title>
        <Typography.Paragraph>
          {cd.H.toString().padStart(2, '0')}:{cd.m.toString().padStart(2, '0')}:
          {cd.s.toString().padStart(2, '0')}:{cd.S.toString().padStart(3, '0')}
        </Typography.Paragraph>
      </div>
    </Container>
  );
}

export const meta = {
  title: '设置最大的单位',
  desc: '设置最大的单位',
};
