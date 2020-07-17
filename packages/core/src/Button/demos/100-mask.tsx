import React from 'react';
import styled from 'styled-components';

import { MaskButton } from '@muya-ui/core';

const Container = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  padding: 10px;
  background-color: #999;
`;

export default function MaskDemo() {
  return (
    <Container>
      <MaskButton>mask button</MaskButton>
    </Container>
  );
}

export const meta = {
  title: '蒙层按钮',
  desc: '蒙层按钮，一般在蒙层上使用',
};
