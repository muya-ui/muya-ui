import React, { useState } from 'react';

import { Button, Dialog, Drawer, Typography } from '@muya-ui/core';

export default function DoubleDrawer() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const drawer = (
    <Drawer open={open} onClose={handleClose} width="50%" direction="right">
      <Dialog.Title closeButtonSize="xl" onClose={handleClose}>
        漂亮的标题
      </Dialog.Title>
      <Dialog.Content>
        <Typography.Paragraph color="assistant">
          <Button plain type="primary" onClick={() => setOpen1(true)}>
            打开第二层抽屉
          </Button>
        </Typography.Paragraph>
      </Dialog.Content>
    </Drawer>
  );
  const drawer1 = (
    <Drawer open={open1} onClose={handleClose1} direction="right">
      <Dialog.Title closeButtonSize="xl" onClose={handleClose1}>
        漂亮的标题
      </Dialog.Title>
      <Dialog.Content>
        <Typography.Paragraph color="assistant">
          酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。
        </Typography.Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button plain type="secondary" onClick={handleClose1}>
          取 消
        </Button>
        <Button type="primary" onClick={handleClose1}>
          确 认
        </Button>
      </Dialog.Actions>
    </Drawer>
  );
  return (
    <div>
      {drawer}
      {drawer1}
      <Button
        onClick={() => {
          setOpen(v => !v);
        }}
      >
        切换Drawer状态
      </Button>
    </div>
  );
}

export const meta = {
  title: '多层抽屉',
  desc: '在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。交互方式相同，一层一层展开和退出；',
};
