import dayjs, { ConfigType, Dayjs } from 'dayjs';
import React from 'react';

import { DateTimePicker, ICalendarOption } from '@muya-ui/core';

const options: ICalendarOption[] = [
  {
    label: '现在',
  },
  {
    label: '下午3点',
    date: () => {
      const d = dayjs()
        .hour(15)
        .minute(0)
        .second(0);
      return d;
    },
  },
];

export default function BasicDemo() {
  const [value, setSelected] = React.useState<ConfigType>();
  const onChange = React.useCallback((date: Dayjs) => {
    // 注意在清空时，date的值为 dayjs('') 跟 RangeDatePicker 保持一致
    // 这个时候如果需要使用合理的值，需要使用 week[0].isValid() 判断
    setSelected(date);
  }, []);

  return (
    <DateTimePicker value={value} onChange={onChange} options={options} placeholder="选择时间" />
  );
}

export const meta = {
  title: '基本使用',
  desc: '基本使用',
};
