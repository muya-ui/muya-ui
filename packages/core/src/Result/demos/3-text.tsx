import React, { useState } from 'react';
import { Button, ButtonGroup, Result, IResultIconType, IResultStatusIcon } from '@muya-ui/core';

export default function TypeDemo() {
  const [type, setType] = useState<IResultIconType | IResultStatusIcon>('forbidden');
  return (
    <>
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <ButtonGroup>
          {['forbidden', 'empty', 'emptySmall'].map(item => (
            <Button
              key={item}
              plain={type !== item}
              onClick={() => setType(item as IResultIconType | IResultStatusIcon)}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Result type={type} />
    </>
  );
}

export const meta = {
  title: '默认文案',
  desc: '以上 3 种类型拥有默认文案',
};
