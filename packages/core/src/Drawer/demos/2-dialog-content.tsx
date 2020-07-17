import React, { useState } from 'react';

import {
  Button,
  Dialog,
  Drawer,
  InlineButton,
  ISlideAnimationDirection,
  Typography,
} from '@muya-ui/core';

export default function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<ISlideAnimationDirection>('left');
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Drawer direction={direction} open={open} onClose={handleClose}>
        <Dialog.Title closeButtonSize="xl" onClose={handleClose}>
          漂亮的标题
        </Dialog.Title>
        <Dialog.Content>
          <Typography.Paragraph color="assistant">
            酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。
          </Typography.Paragraph>
        </Dialog.Content>
        <Dialog.Actions
          tipAction={
            <InlineButton size="s" href="https://www.kujiale.com" target="_blank">
              查看帮助
            </InlineButton>
          }
        >
          <Button plain type="secondary" onClick={handleClose}>
            取 消
          </Button>
          <Button type="primary" onClick={handleClose}>
            确 认
          </Button>
        </Dialog.Actions>
      </Drawer>
      <Button
        onClick={() => {
          setDirection('up');
          setOpen(true);
        }}
      >
        up
      </Button>
      <Button
        onClick={() => {
          setDirection('down');
          setOpen(true);
        }}
      >
        down
      </Button>
      <Button
        onClick={() => {
          setDirection('left');
          setOpen(true);
        }}
      >
        left
      </Button>
      <Button
        onClick={() => {
          setDirection('right');
          setOpen(true);
        }}
      >
        right
      </Button>
    </div>
  );
}

export const meta = {
  title: '使用标准Dialog的内容',
  desc:
    'Drawer是基于`Dialog.Base`实现的，因此标准的`Dialog.Content`、`Dialog.Title`和`Dialog.Actions`均可以作为内容传入',
};
