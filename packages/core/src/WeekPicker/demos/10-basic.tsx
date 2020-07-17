import { Dayjs } from 'dayjs';
import React from 'react';

import { IWeekPickerValue, WeekPicker } from '@muya-ui/core';

export default function BasicDemo() {
  const [selectedWeek, setSelectedWeek] = React.useState<IWeekPickerValue | undefined>();
  const onChange = React.useCallback((week: [Dayjs, Dayjs]) => {
    // 注意在清空时，week的值为 [dayjs(''), dayjs('')] 跟 RangeDatePicker 保持一致
    // 这个时候如果需要使用合理的值，需要使用 week[0].isValid() 判断
    setSelectedWeek(week);
  }, []);

  return <WeekPicker selectedWeek={selectedWeek} onChange={onChange} placeholder="选择周" />;
}

export const meta = {
  title: '基本使用',
  desc: '基本使用',
};
