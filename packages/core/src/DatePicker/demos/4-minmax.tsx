import React from 'react';

import { RangeDatePicker } from '@muya-ui/core';

const rangePlaceholder = ['最少选60天', '最多选65天'];
export default function DefaultDemo() {
  return (
    <div>
      <RangeDatePicker minRangeLength={60} maxRangeLength={65} placeholder={rangePlaceholder} />
    </div>
  );
}

export const meta = {
  title: '区间最大值和最小值',
  desc: `
最多选择的数量，根据 selectType 变化
* \`selectType === 'date'\` 则表示最多（或最少）选择多少天
* \`selectType === 'month'\` 则表示最多（或最少）选择多少月
* \`selectType === 'year'\` 则表示最多（或最少）选择多少年
`,
};
