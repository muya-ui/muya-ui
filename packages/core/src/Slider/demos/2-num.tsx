import React from 'react';
import styled from 'styled-components';

import { Col, InputNumber, Row, Slider } from '@muya-ui/core';

const Container = styled(Row)`
  display: flex;
  align-items: center;
`;

export default function InputNumberDemo() {
  const [value, setValue] = React.useState<number>(0);
  const [inputV, setInput] = React.useState('0');
  const handleValueChange = React.useCallback((v: number) => {
    setValue(v);
    setInput(v.toString());
  }, []);
  const handleInputChange = React.useCallback((vStr: string, v: number) => {
    setValue(v);
    setInput(vStr);
  }, []);
  return (
    <Container gutter={10}>
      <Col span={8}>
        <Slider value={value} onChange={handleValueChange} tooltipVisible />
      </Col>
      <Col span={4}>
        <InputNumber value={inputV} onChange={handleInputChange} />
      </Col>
    </Container>
  );
}

export const meta = {
  title: '带数字输入框的滑块',
  desc: '和 [InputNumber](./inputnumber) 同步',
};
