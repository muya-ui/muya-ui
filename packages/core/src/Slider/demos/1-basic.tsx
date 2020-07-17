import React from 'react';
import styled from 'styled-components';

import { Button, RangeSlider, Slider } from '@muya-ui/core';

const Row = styled.div`
  margin-bottom: 30px;
`;

export default function BasicDemo() {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div>
      <Row>
        <Slider disabled={disabled} defaultValue={30} />
      </Row>
      <Row>
        <RangeSlider disabled={disabled} defaultValue={[20, 40]} />
      </Row>
      <Button onClick={() => setDisabled(!disabled)}>{disabled ? '取消禁用' : '禁用'}</Button>
    </div>
  );
}

export const meta = {
  title: '滑块基础使用方法',
  desc:
    '基本滑动条。当 range 为 true 时，渲染为双滑块。当 disabled 为 true 时，滑块处于不可用状态。',
};
