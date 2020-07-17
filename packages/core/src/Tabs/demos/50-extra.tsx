import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Swipe, Tab, Tabs } from '@muya-ui/core';

const View = styled.div`
  box-sizing: border-box;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #00a0e9;
`;
const StyledSwipe = styled(Swipe)`
  height: 200px;
  margin: 10px 0;
`;
const Container = styled.div``;

export default function ExtraContentDemo() {
  const [tab, setTab] = useState(0);

  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  return (
    <Container>
      <Tabs tabBarExtraContent={<Button>Click Me !</Button>} index={tab} onChange={onChange}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        <Tab>Tab 4</Tab>
      </Tabs>
      <StyledSwipe equalNum={1} stepIndex={tab}>
        <View>1</View>
        <View>2</View>
        <View>3</View>
        <View>4</View>
      </StyledSwipe>
    </Container>
  );
}

export const meta = {
  title: '额外节点',
  desc: '使用 `tabBarExtraContent` 添加操作节点',
};
