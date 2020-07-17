import React, { useState } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Cascader, Row, Typography } from '@muya-ui/core';

const options = [
  {
    label: '福建',
    value: 'fj',
    children: [
      {
        label: '福州',
        value: 'fuzhou',
        children: [
          {
            label: '马尾',
            value: 'mawei',
          },
        ],
      },
      {
        label: '泉州',
        value: 'quanzhou',
      },
    ],
  },
  {
    label: '浙江',
    value: 'zj',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          {
            label: '余杭',
            value: 'yuhang',
          },
        ],
      },
    ],
  },
  {
    label: '北京',
    value: 'bj',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang',
      },
      {
        label: '海淀区',
        value: 'haidian',
      },
    ],
  },
];

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  return (
    <>
      <Typography.Title style={{ marginBottom: '12px' }} level={5}>
        点击切换尺寸：
      </Typography.Title>
      <Row>
        <ButtonGroup>
          <Button plain={size !== 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button plain={size !== 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button plain={size !== 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button plain={size !== 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Cascader options={options} size={size} />
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '尺寸，可以是 xl 、l 、m 、s 。',
};
