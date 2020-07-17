import React, { useState } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Row, Switch, Typography } from '@muya-ui/core';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

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
        <Switch size={size} defaultChecked onChange={onChange} />
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '尺寸，可以是 xl 、l 、m 、s 。默认 xl 和 l 相同，m 和 s 相同',
};
