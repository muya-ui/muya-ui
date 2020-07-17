import React, { useState } from 'react';
import styled from 'styled-components';

import { Swipe, Tab, Tabs } from '@muya-ui/core';

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
export default function CardDemo() {
  const [tab, setTab] = useState(0);

  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  return (
    <div>
      <Tabs type="card" index={tab} onChange={onChange}>
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
    </div>
  );
}

export const meta = {
  title: '包裹型的Tabs',
  desc:
    '包裹型的Tabs，对于等高的左右切换的内容，可以用 `Swipe` 作为容器使用，具体 `Swipe` 的用法可以查看：[Swipe](./swipe)',
};
