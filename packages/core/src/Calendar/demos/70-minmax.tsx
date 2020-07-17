import React from 'react';
import styled from 'styled-components';

import { RangeCalendar } from '@muya-ui/core';

const Container = styled.div`
  display: flex;

  & .calendar {
    box-shadow: 0 0 12px 0 rgba(56, 60, 66, 0.12);
  }
`;

export default function MinMaxDemo() {
  return (
    <Container>
      <RangeCalendar className="calendar" minRangeLength={30} maxRangeLength={65} />
    </Container>
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
