import React from 'react';

import { Animation, Button, Popper, Typography } from '@muya-ui/core';

export default function TransitionDemo() {
  const [anchorEl, setAnchorEl] = React.useState<React.MouseEvent['currentTarget']>();

  function handleClick(event: React.MouseEvent) {
    setAnchorEl(anchorEl ? undefined : event.currentTarget);
  }

  return (
    <>
      <Button onClick={handleClick}>点击切换Popper状态</Button>
      <Popper open={!!anchorEl} anchorEl={anchorEl} transition>
        {({ transitionProps }) => (
          <Animation.Fade {...transitionProps}>
            <Typography.Text>The content of the Popper.</Typography.Text>
          </Animation.Fade>
        )}
      </Popper>
    </>
  );
}

export const meta = {
  title: '渐变Popper',
  desc:
    '`Popper`可以搭配`react-transiton-group`使用。它接收function child，并将transitionProps作为参数传递给外部动画组件',
};
