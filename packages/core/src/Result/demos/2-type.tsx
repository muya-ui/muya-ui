import React, { useState } from 'react';
import { Button, ButtonGroup, Result, IResultIconType, IResultStatusIcon } from '@muya-ui/core';

export default function TypeDemo() {
  const [type, setType] = useState<IResultStatusIcon | IResultIconType>('success');
  return (
    <>
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <ButtonGroup>
          {['success', 'error', 'warning', 'info', 'forbidden', 'empty', 'emptySmall'].map(item => (
            <Button
              key={item}
              plain={type !== item}
              onClick={() => setType(item as IResultStatusIcon | IResultIconType)}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Result title="提示" subTitle="提示文案" type={type} />
    </>
  );
}

export const meta = {
  title: '种类',
  desc: '有 7 种基础类型，用于表达不同的信息',
};
