import React from 'react';
import { Anchor, Typography, Img, Space } from '@muya-ui/core';

export default function HorizonTalDemo() {
  return (
    <Anchor.Provider disableHash direction="horizontal">
      <Anchor.Tabs style={{ marginBottom: 12 }}>
        <Anchor.Tab index="#demo-30-tab1" title="Tab1" />
        <Anchor.Tab index="#demo-30-tab2" title="Tab2" />
        <Anchor.Tab index="#demo-30-tab3" title="Tab3" />
      </Anchor.Tabs>
      <Anchor.ScrollView height={200}>
        <Space block direction="vertical">
          <Typography.Title level={4} id="demo-30-tab1">
            Tab 1
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="demo-30-tab2">
            Tab 2
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
            width={200}
            height={200}
          />
          <Typography.Title level={4} id="demo-30-tab3">
            Tab 3
          </Typography.Title>
          <Img
            src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
            width={200}
            height={200}
          />
        </Space>
      </Anchor.ScrollView>
    </Anchor.Provider>
  );
}

export const meta = {
  title: '水平锚点',
  desc: '水平锚点通常搭配自定义容器使用，设置`direction`为`horizontal`即可开启水平方向的锚点',
};
