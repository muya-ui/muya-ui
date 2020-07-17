import React from 'react';
import styled from 'styled-components';

import { Tab, Tabs } from '@muya-ui/core';

const Container = styled.div`
  .example-tabs {
    display: flex;
    justify-content: center;
  }
`;
const styles = { container: 'example-tabs' };
export default function BasicDemo() {
  // 在图片的量比较少的情况，可以直接把 lazy 设置为 off，关掉懒加载
  return (
    <Container>
      <Tabs className="tabs" styles={styles}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        <Tab>Tab 4</Tab>
      </Tabs>
    </Container>
  );
}

export const meta = {
  title: '常见案例1',
  desc: '自定义 Tabs',
};
