import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';

import { countdown, useAfterEffect } from '@muya-ui/utils';
import { TimeIcon } from '@muya-ui/theme-light';
import { InlineButton, Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;

  & .col {
    width: 200px;
  }

  & ${InlineButton} {
    margin: 0;
  }
`;

const targetDate = dayjs()
  .add(40, 'day')
  .add(4, 'hour');

function refreshCD() {
  const remain = targetDate.diff(dayjs());
  return countdown(remain, 'D');
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
          还剩
          <InlineButton type="primary">{cd.D}</InlineButton>天
          <InlineButton type="primary">{cd.H}</InlineButton>小时
          <InlineButton type="primary">{cd.m}</InlineButton>分
          <InlineButton type="primary">{cd.s}</InlineButton>秒
        </Typography.Paragraph>
      </div>
      <div className="col">
        <Typography.Title level={5}>天数倒计时</Typography.Title>
        <Typography.Paragraph>
          <InlineButton prefixNode={<TimeIcon />}>
            {cd.D}天{cd.H}时{cd.m}分{cd.s}秒
          </InlineButton>
        </Typography.Paragraph>
      </div>
    </Container>
  );
}

export const meta = {
  title: '不同样式',
  desc: '不同样式',
};
