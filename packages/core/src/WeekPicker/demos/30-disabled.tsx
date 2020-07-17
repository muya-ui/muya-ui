import { Dayjs } from 'dayjs';
import React from 'react';

import { WeekPicker } from '@muya-ui/core';

const disableWeek = (week: [Dayjs, Dayjs]) => {
  // 禁用 6-15 的那一周
  return week[0].date() === 15;
};

export default function DisabledDemo() {
  return <WeekPicker placeholder="选择周" defaultViewDate="2020-06-15" disableWeek={disableWeek} />;
}

export const meta = {
  title: '禁用周',
  desc: '通过一周的开始结束来禁用周',
};
