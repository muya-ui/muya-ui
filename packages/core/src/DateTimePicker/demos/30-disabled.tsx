import { Dayjs } from 'dayjs';
import React from 'react';

import { DateTimePicker } from '@muya-ui/core';

const disableDate = (date: Dayjs) => {
  // 禁用 6-15
  return date.date() === 15;
};

const disabledHours = (num: number) => {
  return num !== 13 && num !== 14;
};
const disabledMinutes = (selectedHour: number) => (num: number) => {
  return selectedHour === 13 && num > 1 && num < 10;
};

const disabledSeconds = (selectedHour: number, selectedMinute: number) => (num: number) => {
  return selectedHour === 14 && selectedMinute === 5 && num > 1 && num < 10;
};

export default function DisabledDemo() {
  return (
    <DateTimePicker
      placeholder="选择时间"
      defaultViewDate="2020-06-15"
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      disabledSeconds={disabledSeconds}
      disableDate={disableDate}
    />
  );
}

export const meta = {
  title: '设置禁用',
  desc: '禁用某一些时间选项，可以参考 `TimePicker` 和 `DatePicker` 的禁用',
};
