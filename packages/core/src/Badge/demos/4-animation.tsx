import React, { useState } from 'react';
import styled from 'styled-components';

import { AddIcon, MinusIcon } from '@muya-ui/theme-light';
import { Badge, Button, ButtonGroup, Row, Switch } from '@muya-ui/core';

const Square = styled.span`
  display: inline-block;
  width: 64px;
  height: 28px;
  background: #ddd;
  border-radius: 4px;
`;

export default function AnimationDemo() {
  const [value, setValue] = useState(1);
  const [on, setOn] = useState(true);

  return (
    <>
      <Row>
        <Badge value={value}>
          <Square />
        </Badge>
        <ButtonGroup style={{ marginLeft: '25px' }}>
          <Button onClick={() => setValue(value + 1)}>
            <AddIcon />
          </Button>
          <Button disabled={value < 1} onClick={() => setValue(value - 1)}>
            <MinusIcon />
          </Button>
        </ButtonGroup>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <Badge dot={on}>
          <Square />
        </Badge>
        <Switch
          defaultChecked
          autoFocus
          onChange={checked => setOn(checked)}
          style={{ marginLeft: '25px' }}
        />
      </Row>
    </>
  );
}

export const meta = {
  title: '徽标值变化',
  desc: '徽标 `value` 可以动态发生改变',
};
