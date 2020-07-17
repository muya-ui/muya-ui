import React, { useRef, useEffect } from 'react';
import { Popper, Button, Typography } from '@muya-ui/core';

export default function SimpleDemo() {
  const [anchorEl, setAnchorEl] = React.useState<React.MouseEvent['currentTarget']>();

  function handleClick(event: React.MouseEvent) {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(undefined);
    }
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(ref, ref.current);
  });
  return (
    <>
      <Button onClick={handleClick}>点击切换Popper状态</Button>
      <Popper ref={ref} open={!!anchorEl} anchorEl={anchorEl}>
        <Typography.Text>The content of the Popper.</Typography.Text>
      </Popper>
    </>
  );
}

export const meta = {
  title: 'Popper简单使用',
  desc: '`Popper`会根据`ahchorEl`来定位，控制`Popper`的`open`属性即可展示/隐藏`Popper`。',
};
