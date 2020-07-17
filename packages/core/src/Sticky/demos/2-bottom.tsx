import React from 'react';
import { Button, Sticky } from '@muya-ui/core';
import styled from 'styled-components';

const Background = styled.div`
  background: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
  height: 1000px;
  padding-top: 100px;
`;

const Container = styled.div`
  height: 300px;
  overflow-y: scroll;
`;

export default function Scroll() {
  return (
    <Container id="sticky-wrapper">
      <Background>
        <Sticky
          offsetTop={0}
          target={() => document.querySelector('#sticky-wrapper') as HTMLElement}
        >
          <Button type="primary">固定于容器顶部</Button>
        </Sticky>
      </Background>
    </Container>
  );
}

export const meta = {
  title: '滚动容器',
  desc: '用 target 设置 Sticky 需要监听其滚动事件的元素，默认为 window',
};
