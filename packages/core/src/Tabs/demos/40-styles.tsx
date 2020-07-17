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
const Container = styled.div`
  .example-tabs {
    display: flex;
    justify-content: center;
  }
  .custom-tab {
    margin: 0 20px;
  }
  .swipe {
    height: 200px;
    margin: 10px auto;
  }
`;

export default function BasicDemo() {
  const [tab, setTab] = useState(0);

  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  return (
    <Container>
      <Tabs className="tabs" styles={{ container: 'example-tabs' }} index={tab} onChange={onChange}>
        <Tab className="custom-tab">Tab 1</Tab>
        <Tab className="custom-tab">Tab 2</Tab>
        <Tab className="custom-tab">Tab 3</Tab>
        <Tab className="custom-tab">Tab 4</Tab>
      </Tabs>
      <Swipe className="swipe" equalNum={1} stepIndex={tab}>
        <View>1</View>
        <View>2</View>
        <View>3</View>
        <View>4</View>
      </Swipe>
    </Container>
  );
}

export const meta = {
  title: '样式重置',
  desc: '可以使用 `styles` 进行样式重置，比如常见的让 tabs 居中',
};
