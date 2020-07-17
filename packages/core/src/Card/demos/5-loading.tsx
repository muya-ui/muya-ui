import React from 'react';

import { Card, CardWrapper, Skeleton, Switch, Typography, useTheme } from '@muya-ui/core';

export default function Demo() {
  const theme = useTheme();
  const titleLevel = theme.themeName === 'muya-theme-coohom' ? 5 : 4;
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <Switch
        style={{ marginBottom: 10 }}
        checked={loading}
        onChange={value => setLoading(value)}
      />
      <CardWrapper style={{ width: 300 }} shadowed={false} hoverShadowed={false} loading={loading}>
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <Card.Content padding="8px 0 12px">
          <Typography.Title level={titleLevel} style={{ marginBottom: '4px' }}></Typography.Title>
          <Typography.Text>
            这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定
          </Typography.Text>
        </Card.Content>
      </CardWrapper>
      <CardWrapper style={{ width: 300, marginTop: 20 }}>
        <Skeleton
          loading={loading}
          style={{
            width: '100%',
            height: 220,
          }}
        >
          <Card.Header
            height={220}
            src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
          />
        </Skeleton>
        <Card.Content>
          <Skeleton
            loading={loading}
            type="paragraph"
            rows={1}
            style={{
              width: '100%',
            }}
            styles={{ paragraph: { marginTop: 6 } }}
          >
            <Typography.Title level={titleLevel} style={{ marginBottom: '4px' }}>
              标题文案
            </Typography.Title>
            <Typography.Text>
              这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定
            </Typography.Text>
          </Skeleton>
        </Card.Content>
      </CardWrapper>
    </div>
  );
}

export const meta = {
  title: '显示骨架屏',
  desc: '显示骨架屏用法，推荐自定义骨架屏',
};
