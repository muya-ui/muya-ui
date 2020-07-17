import React from 'react';

import { TimePicker } from '@muya-ui/core';

export default function FormatDemo() {
  return (
    <div>
      <TimePicker format="HH:m" placeholder="选择时间" />
    </div>
  );
}

export const meta = {
  title: '自定义格式',
  desc: '自定义格式',
};
