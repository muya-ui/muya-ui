import React, { useState } from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Checkbox, Row, Typography } from '@muya-ui/core';

export default function SizeDemo() {
  const [size, setSize] = useState<IComponentSizeSpec>('m');
  const [checked, setChecked] = useState(false);
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
        <Checkbox
          size={size}
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
        >
          Size: {size}
        </Checkbox>
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '支持 s、m、l、xl 四个尺寸',
};
