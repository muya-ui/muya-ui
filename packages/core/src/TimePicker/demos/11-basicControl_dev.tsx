import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { TimePicker } from '@muya-ui/core';

const options = [{ label: '此刻' }];
export default function BasicDemo() {
  const [time, setTime] = React.useState(dayjs());
  const onChange = React.useCallback((time: Dayjs) => {
    setTime(time);
  }, []);
  return (
    <>
      <TimePicker placeholder="选择时间" value={time} onChange={onChange} options={options} />
    </>
  );
}

export const meta = {
  title: '基础受控用法',
  desc: '基础受控用法',
};
