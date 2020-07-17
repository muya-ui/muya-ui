import React from 'react';
import styled from 'styled-components';

import { TimePicker } from '@muya-ui/core';

const options = [{ label: '此刻' }];
const Container = styled.div`
  .my-footer {
    justify-content: flex-end;
  }
`;

const styles = {
  footer: {
    justifyContent: 'flex-end',
    padding: '0 10px',
  },
};

export default function OptionDemo() {
  return (
    <Container>
      <TimePicker placeholder="选择时间" options={options} styles={styles} />
    </Container>
  );
}

export const meta = {
  title: '快捷选项',
  desc: '快捷选项',
};
