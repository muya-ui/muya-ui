import React, { useState } from 'react';

import { Button, ButtonGroup } from '@muya-ui/core';

export default function GroupTabDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <ButtonGroup plain={true}>
      {['一', '二', '三'].map((item, i) => (
        <Button
          key={item}
          selected={activeIndex === i}
          onClick={() => handleClick(i)}
          fontWeight="lighter"
        >
          {activeIndex === i ? '选中标签' : `标签${item}`}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export const meta = {
  title: '按钮组切换',
  desc: '按钮组实现类型切换的效果。',
};
