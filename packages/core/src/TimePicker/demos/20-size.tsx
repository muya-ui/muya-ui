import React from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, TimePicker } from '@muya-ui/core';

export default function SizeDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <div>
      <ButtonGroup style={{ marginBottom: 10 }} plain={true}>
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
      <div>
        <TimePicker placeholder="选择时间" size={size} />
      </div>
    </div>
  );
}

export const meta = {
  title: '不同尺寸',
  desc: '不同尺寸',
};
