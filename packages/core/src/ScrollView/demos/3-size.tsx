import React, { useState } from 'react';
import { ScrollView, Typography, Row, ButtonGroup, Button, Space } from '@muya-ui/core';
import { IComponentSizeSpec } from '@muya-ui/theme-light';

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('l');
  return (
    <>
      <Typography.Title style={{ marginBottom: '12px' }} level={5}>
        点击切换尺寸：
      </Typography.Title>
      <Space spacing="s5" direction="vertical" block>
        <Row>
          <ButtonGroup plain={true}>
            <Button selected={size === 'xl'} onClick={() => setSize('xl')}>
              xl
            </Button>
            <Button selected={size === 'l'} onClick={() => setSize('l')}>
              l
            </Button>
            <Button selected={size === 'm'} onClick={() => setSize('m')}>
              m
            </Button>
            <Button selected={size === 's'} onClick={() => setSize('s')}>
              s
            </Button>
          </ButtonGroup>
        </Row>
        <Row>
          <ScrollView width="100%" height={400} size={size}>
            <div style={{ height: 100, background: '#00a0e9' }}></div>
            <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
            <div style={{ height: 100, background: '#00a0e9' }}></div>
            <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
            <div style={{ height: 100, background: '#00a0e9' }}></div>
            <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
          </ScrollView>
        </Row>
      </Space>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '默认 s/m 为小尺寸，l/xl 为大尺寸，大号尺寸一般用于页面级的滚动容器',
};
