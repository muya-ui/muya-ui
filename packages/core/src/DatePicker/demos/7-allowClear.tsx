import React from 'react';
import styled from 'styled-components';

import { DatePicker, RangeDatePicker } from '@muya-ui/core';

const Container = styled.div`
  margin-bottom: 20px;
`;

const rangePlaceholder = ['开始时间', '结束时间'];
export default function FormatDemo() {
  return (
    <>
      <Container>
        <DatePicker placeholder="选择日期" allowClear={false} readOnly />
      </Container>
      <Container>
        <RangeDatePicker
          placeholder={rangePlaceholder}
          allowClear={false}
          inputProps={{ readOnly: true }}
        />
      </Container>
    </>
  );
}

export const meta = {
  title: '禁用清空',
  desc: '禁用清空，酌情考虑使用 `readOnly` 禁用 input 的输入。',
};
