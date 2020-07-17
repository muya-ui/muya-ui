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
export default function PageDemo() {
  const [tab, setTab] = useState(0);

  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  const [size, setSize] = useState(5);
  const tabs = Array(size);
  tabs.fill(0);

  const toggleSize = () => {
    const newSize = size === 5 ? 30 : 5;
    setSize(newSize);
  };

  return (
    <Container>
      <Tabs index={tab} onChange={onChange} swipe>
        {tabs.map((i, index) => (
          <Tab key={index}>{`Tab ${index}`}</Tab>
        ))}
      </Tabs>
      <StyledSwipe equalNum={1} stepIndex={tab}>
        {tabs.map((i, index) => (
          <View key={index}>{`View ${index}`}</View>
        ))}
      </StyledSwipe>
      <div>
        <Button onClick={toggleSize}>切换Tab数量</Button>
      </div>
    </Container>
  );
}

export const meta = {
  title: 'Tabs 翻页',
  desc: '设置了`swipe={true}`以后，当内容超出容器范围，会自动出现翻页',
};
