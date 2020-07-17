import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { Typography, WeekPicker } from '@muya-ui/core';

const Container = styled.div``;

const WEEK = 7 * 24 * 3600;
const formatWeek = (week: [Dayjs, Dayjs]) => {
  const [weekStart] = week;
  // 获取当前这个月的第一天所在周的第一天
  const monthStartWeekStart = weekStart.startOf('month').startOf('week');
  const weekIndex = (weekStart.unix() - monthStartWeekStart.unix()) / WEEK;

  return `${weekStart.format('M')}月的第${weekIndex + 1}周`;
};

export default function FormatDemo() {
  return (
    <Container>
      <Typography.Paragraph>自定义格式</Typography.Paragraph>
      <WeekPicker
        placeholder="选择周"
        defaultValue="2020-06-15"
        format="MM-DD"
        formatSeparator=" ~ "
      />

      <Typography.Paragraph>
        <br />
        通过函数来定义
      </Typography.Paragraph>
      <WeekPicker placeholder="选择周" defaultValue="2020-06-15" format={formatWeek} />
    </Container>
  );
}

export const meta = {
  title: '自定义周显示',
  desc: '自定义周显示',
};
