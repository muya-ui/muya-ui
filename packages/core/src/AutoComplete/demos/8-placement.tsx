import React from 'react';

import { AutoComplete, Row } from '@muya-ui/core';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

export default function PlacementDemo() {
  return (
    <>
      <Row>
        <AutoComplete dataSource={dataSource} placeholder="默认向下弹出" />
      </Row>
      <Row>
        <AutoComplete dataSource={dataSource} placement="top" placeholder="向上弹出" />
      </Row>
    </>
  );
}

export const meta = {
  title: '弹出位置',
  desc: '向上弹出或向下弹出',
};
