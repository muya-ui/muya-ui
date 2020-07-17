import React, { useState } from 'react';

import { Button, ButtonGroup } from '@muya-ui/core';

export default function DrawerDemo() {
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
  title: '胶囊型Tabs',
  desc: '胶囊型使用 `ButtonGroup` 实现，需要注意的是：不支持 `swipe`',
};
