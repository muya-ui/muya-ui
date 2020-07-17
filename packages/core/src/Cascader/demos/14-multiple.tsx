import React, { useState } from 'react';

import { Cascader, Row, Switch, Typography } from '@muya-ui/core';

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
          {
            label: '江干',
            value: 'jianggan',
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
        disabled: true,
      },
    ],
  },
];

export default function MultipleDemo() {
  const [collapseTags, setCollapseTags] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <>
      <Row>
        <Typography.Title level={5}>Tag 合并：</Typography.Title>
        <Switch checked={collapseTags} onChange={(checked: boolean) => setCollapseTags(checked)} />
      </Row>
      <Row>
        <Typography.Title level={5}>父子节点选中状态不再关联：</Typography.Title>
        <Switch
          checked={checkStrictly}
          onChange={(checked: boolean) => setCheckStrictly(checked)}
        />
      </Row>
      <Cascader
        options={options}
        collapseTags={collapseTags}
        checkStrictly={checkStrictly}
        multiple
      />
    </>
  );
}

export const meta = {
  title: '级联多选',
  desc: '级联多选',
};
