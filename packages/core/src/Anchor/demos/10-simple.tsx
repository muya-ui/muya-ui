import React from 'react';
import { Anchor, Sticky } from '@muya-ui/core';

export default function SimpleDemo() {
  return (
    <Anchor.Provider
      disableHash
      // 全局导航的高度
      offsetTop={60}
    >
      <Sticky
        offsetTop={100}
        style={{ display: 'flex', flexDirection: 'row-reverse' }}
        styles={{
          sticky: { background: '#fff' },
        }}
      >
        <Anchor.Tabs>
          <Anchor.Tab index="#基本用法" title="基本用法" />
          <Anchor.Tab index="#自定义滚动容器" title="自定义滚动容器" />
          <Anchor.Tab index="#水平锚点" title="水平锚点" />
        </Anchor.Tabs>
      </Sticky>
    </Anchor.Provider>
  );
}

export const meta = {
  title: '基本用法',
  desc:
    '1. 锚点组件需要放置在`Anchor.Provider`内部，锚点的功能配置也都需要设置在Provider上 \n\n 2. `Anchor.Tab/Tabs`组成锚点的主体，`index`属性必填并符合`#{dom-id}`格式 \n\n 3. `Anchor.Tabs`的位置完全由开发者定义，也可以搭配`Sticky`组件使用',
};
