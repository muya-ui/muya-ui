import { Progress } from '@muya-ui/core';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
`;

export default function Circle() {
  return (
    <>
      <Wrapper>
        <Progress progress={30} type="circle" />
      </Wrapper>
      <Wrapper>
        <Progress progress={70} type="circle" status="error" />
      </Wrapper>
      <Wrapper>
        <Progress progress={100} type="circle" />
      </Wrapper>
    </>
  );
}

export const meta = {
  title: '环形进度条',
  desc: '将`Progress`的`type`设置为`circle`可以开启环形进度条',
};
