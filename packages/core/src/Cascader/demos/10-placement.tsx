import React from 'react';

import { Cascader, Row, Typography } from '@muya-ui/core';

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
  {
    label: '内蒙古自治区',
    value: 'nmg',
    children: [
      {
        label: '呼和浩特',
        value: 'hhht',
      },
    ],
  },
];

export default function PlacementDemo() {
  return (
    <>
      <Row>
        <Typography.Title level={5}>顺序向上：</Typography.Title>
      </Row>
      <Row>
        <Cascader options={options} placement="top-start" />
      </Row>
      <Row>
        <Typography.Title level={5}>逆序向上：</Typography.Title>
      </Row>
      <Row>
        <Cascader options={options} placement="top-end" />
      </Row>
      <Row>
        <Typography.Title level={5}>顺序向下：</Typography.Title>
      </Row>
      <Row>
        <Cascader options={options} placement="bottom-start" />
      </Row>
      <Row>
        <Typography.Title level={5}>逆序向下：</Typography.Title>
      </Row>
      <Row>
        <Cascader options={options} placement="bottom-end" />
      </Row>
    </>
  );
}

export const meta = {
  title: '弹出位置',
  desc: '仅支持 `top-start`、`top-end`、`bottom-start`、`bottom-end` 四种弹出位置',
};
