import React from 'react';
import styled from 'styled-components';

import { Pagination } from '@muya-ui/core';

const Block = styled.div`
  padding: 10px;
  background: ${props => props.theme.colors.pattern.background.divider};
`;

export default function GrayBgDemo() {
  return (
    <Block>
      <Pagination totalRecords={200} defaultCurrent={3} isDarkBackground showQuickJumper />
      <Pagination totalRecords={200} simple isDarkBackground showQuickJumper />
    </Block>
  );
}

export const meta = {
  title: '灰底',
  desc: '深色背景',
};
