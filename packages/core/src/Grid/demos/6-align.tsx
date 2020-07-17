import React from 'react';
import styled from 'styled-components';

import { Col, IAlignType, Row } from '@muya-ui/core';

const StyledRow = styled(Row)`
  margin: 10px 0;
`;

const StyledCol = styled(Col)`
  min-height: 30px;
  margin: 8px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
  text-align: center;
  border-radius: 0;
  background-color: #00a0e9;
  &:nth-child(2n + 1) {
    background-color: rgba(0, 160, 233, 0.7);
  }
`;

const Height100 = styled.div`
  height: 100px;
`;

const Height50 = styled.div`
  height: 50px;
`;

export default function AlignDemo() {
  return (
    <>
      {['top', 'middle', 'bottom'].map(align => (
        <StyledRow key={align} justify="space-between" align={align as IAlignType}>
          <StyledCol span={4}>
            <Height100>col-4</Height100>
          </StyledCol>
          <StyledCol span={4}>
            <Height50>col-4</Height50>
          </StyledCol>
          <StyledCol span={4}>
            <Height100>col-4</Height100>
          </StyledCol>
          <StyledCol span={4}>
            <Height50>col-4</Height50>
          </StyledCol>
        </StyledRow>
      ))}
    </>
  );
}

export const meta = {
  title: 'Flex 垂直对齐',
  desc: '子元素根据不同的值 `top`, `middle`, `bottom`，分别定义其在父节点里面垂直排布方式。',
};
