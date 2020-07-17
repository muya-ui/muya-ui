import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Dialog, Drawer, Swipe, Tab, Tabs } from '@muya-ui/core';

const View = styled.div`
  width: 60px;
  background: green;
  box-sizing: border-box;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #00a0e9;
`;

const Container = styled.div`
  .swipe {
    width: 100%;
    height: 200px;
    margin: 10px 0;
  }
`;
export default function DrawerDemo() {
  const [lineIndicatorMode, setLineIndicatorMode] = useState<'static' | 'default'>('static');
  const [tab, setTab] = useState(2);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const onChange = (value: number | string) => {
    setTab(value as number);
  };
  return (
    <>
      <Drawer
        width="30%"
        height="100%"
        direction="right"
        open={open}
        onClose={handleClose}
        onEntered={() => {
          setLineIndicatorMode('default');
        }}
      >
        <Dialog.Title closeButtonSize="xl" onClose={handleClose}>
          抽屉中的Tabs
        </Dialog.Title>
        <Dialog.Content>
          <Container>
            <Tabs index={tab} lineIndicatorMode={lineIndicatorMode} onChange={onChange}>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2222222</Tab>
              <Tab>Tab 3333</Tab>
              <Tab>Tab 4444444444444</Tab>
            </Tabs>
            <Swipe className="swipe" equalNum={1} stepIndex={tab}>
              <View>1</View>
              <View>2</View>
              <View>3</View>
              <View>4</View>
            </Swipe>
          </Container>
        </Dialog.Content>
      </Drawer>

      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开抽屉
      </Button>
    </>
  );
}

export const meta = {
  title: '特殊动画优化',
  desc:
    '在一些特殊的组件中，比如 `Drawer`, `line` 模式 Tabs 可能会出现定位不准确，这个时候可以使用 `lineIndicatorMode="static"` 来优化',
};
