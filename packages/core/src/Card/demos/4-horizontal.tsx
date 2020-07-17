import React from 'react';
import { InlineButton, Card, CardWrapper } from '@muya-ui/core';

export default function Demo() {
  return (
    <div>
      <CardWrapper style={{ width: 500, display: 'flex' }}>
        <Card.Header
          height={220}
          style={{ width: 300 }}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Card.Content>
            <Card.Meta
              title="标题文案"
              text="这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定"
            />
          </Card.Content>
          <Card.Actions>
            <InlineButton type="primary">操作 1</InlineButton>
            <InlineButton type="primary">操作 2</InlineButton>
            <InlineButton type="primary" style={{ marginLeft: 'auto' }}>
              操作 3
            </InlineButton>
          </Card.Actions>
        </div>
      </CardWrapper>
    </div>
  );
}

export const meta = {
  title: '水平布局',
  desc: 'Card 水平布局',
};
