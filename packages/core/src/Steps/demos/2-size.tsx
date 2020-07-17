import React from 'react';
import { Steps, Step, ButtonGroup, Button } from '@muya-ui/core';
import { IComponentSizeSpec } from '@muya-ui/theme-light';

export default function Simple() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('s');
  return (
    <>
      <div style={{ marginBottom: 12 }}>
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
      </div>
      <Steps current={1} size={size}>
        <Step title="已完成" description="这里是描述部分" />
        <Step title="处理中" description="这里是描述部分" />
        <Step title="等待处理" description="这里是描述部分" />
      </Steps>
    </>
  );
}

export const meta = {
  title: '步骤条尺寸',
  desc: '步骤条尺寸，可以是 xl 、l 、m 、s 。',
};
