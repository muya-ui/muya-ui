import React, { ReactElement, useState } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import {
  Button,
  ButtonGroup,
  ISelectValueType,
  Option,
  Row,
  Select,
  Typography,
} from '@muya-ui/core';

const children: ReactElement[] = [];
for (let i = 10; i < 36; i++) {
  const key = i.toString(36) + i;
  children.push(
    <Option key={key} value={key}>
      {key}
    </Option>,
  );
}

function onChange(value: ISelectValueType) {
  console.log('selected: ', value);
}

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  return (
    <>
      <Typography.Title style={{ marginBottom: '12px' }} level={5}>
        点击切换尺寸：
      </Typography.Title>
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
        <Select showSearch size={size} defaultValue="a10" onChange={onChange}>
          {children}
        </Select>
      </Row>
      <Row>
        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={onChange}
        >
          {children}
        </Select>
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '尺寸，可以是 xl 、l 、m 、s 。',
};
