import React from 'react';
import { Anchor, Typography, Img, Space } from '@muya-ui/core';

export default function VerticalDemo() {
  return (
    <Anchor.Provider disableHash>
      <div style={{ width: 400, position: 'relative', paddingLeft: 100 }}>
        <Anchor.Tabs style={{ position: 'absolute', left: 0, top: 0 }}>
          <Anchor.Tab index="#tab1" title="Tab1" />
          <Anchor.Tab index="#tab2" title="Tab2" />
          <Anchor.Tab index="#tab3" title="Tab3">
            <Anchor.Tab index="#tab3-1" title="Tab3-1" />
            <Anchor.Tab index="#tab3-2" title="Tab3-2" />
          </Anchor.Tab>
        </Anchor.Tabs>
        <Anchor.ScrollView height={200}>
          <Space block direction="vertical">
            <Typography.Title level={4} id="tab1">
              Tab 1
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004U2Cn83dZlWt_1.jpg?max_age=2592000"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="tab2">
              Tab 2
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000P3l050Olt27_1.jpg?max_age=2592000"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="tab3">
              Tab 3
            </Typography.Title>
            <Img
              src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2_2.jpg?max_age=2592000"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="tab3-1">
              Tab 3 - 1
            </Typography.Title>
            <Img
              src="//qhstaticssl.kujiale.com/newt/29/image/png/1567069312065/7FD37039428117756880A94B3224477C.png"
              width={200}
              height={200}
            />
            <Typography.Title level={4} id="tab3-2">
              Tab 3 - 2
            </Typography.Title>
            <Img
              src="//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png"
              width={200}
              height={200}
            />
          </Space>
        </Anchor.ScrollView>
      </div>
    </Anchor.Provider>
  );
}

export const meta = {
  title: '自定义滚动容器',
  desc:
    ' 如果需要在自定义容器中使用锚点，请使用`Anchor.ScrollView`，一个`Anchor.Provider`内只支持一个自定义容器',
};
