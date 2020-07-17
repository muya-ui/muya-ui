import React from 'react';

import { Button, TimePicker } from '@muya-ui/core';

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
  const [hideDisabledOptions, setHideDisabledOptions] = React.useState(false);
  return (
    <div>
      <TimePicker
        placeholder="选择时间"
        hideDisabledOptions={hideDisabledOptions}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
      />
      <Button
        style={{ marginLeft: 10 }}
        onClick={() => setHideDisabledOptions(!hideDisabledOptions)}
      >
        {hideDisabledOptions ? '显示 disabled' : '隐藏 disabled'}
      </Button>
    </div>
  );
}

export const meta = {
  title: '设置禁用的选项',
  desc: '设置禁用的选项',
};
